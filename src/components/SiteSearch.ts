/**
 * `<vd-search>`: the one interactive thing in the chrome (SPEC §3 keeps the rest at zero
 * JS). Pagefind builds its index and its own JS bundle into `dist/pagefind/` after the
 * Astro build, so both are fetched at runtime rather than imported at build time.
 *
 * Two things here are load-bearing and easy to get wrong:
 *
 * 1. Both URLs are resolved by the PAGE, with `pageUrl`, and arrive as attributes. They
 *    have to carry the site's base, because production serves from a subpath where a
 *    bare `/pagefind/pagefind.js` 404s while working perfectly on localhost, which is
 *    the worst failure shape there is. Resolving them here from a base string is how
 *    that goes wrong twice: `pageUrl('')` returns `/`, so `${base}/pagefind/...` builds
 *    `//pagefind/...`, a protocol-relative URL that fetches `http://pagefind/`.
 * 2. The import must be opaque to Vite. A literal dynamic import would be resolved and
 *    bundled at build time, when `dist/pagefind/` does not exist yet, so the build fails.
 *    `@vite-ignore` on a computed specifier is what keeps it a runtime fetch.
 *
 * The same element is both the /search page and the chrome's modal (SearchPanel.astro).
 * `data-sync-url` is what tells them apart: the page owns the address bar, the modal is a
 * guest on someone else's page and leaves it alone.
 */

import { correction, nearestWord, type Paths, vocabulary } from '#src/lib/nearest.ts';
import { droppedWords, matchedTyping, namesTopResult } from '#src/lib/search-signals.ts';
import { track } from '#src/lib/track.ts';
import { canonicalPath } from '#src/lib/url.ts';

interface PagefindSubResult {
  url: string;
  excerpt: string;
}

interface PagefindResultData {
  url: string;
  excerpt: string;
  meta: Record<string, string | undefined>;
  sub_results?: PagefindSubResult[];
}

interface PagefindResult {
  id: string;
  data(): Promise<PagefindResultData>;
}

interface PagefindSearch {
  results: PagefindResult[];
}

interface PagefindApi {
  options(opts: Record<string, unknown>): Promise<void>;
  init(): Promise<void>;
  /** A null term with filters is "everything in this filter", which is how All works. */
  search(query: string | null, options?: { filters?: Filters }): Promise<PagefindSearch>;
}

/** The narrowing in force: `category` and `tag`, each at most one value, each optional. */
type Filters = Record<string, string>;

/** What a search actually ran, which is not always what was typed. */
interface Attempt {
  results: PagefindResult[];
  /** Set when words were dropped to get here, so the reader is told. */
  ran?: string;
  /** Set when the query was misspelled and the dictionary knew the word anyway. */
  corrected?: string;
}

/** How many results to render at once. The rest wait behind "show more". */
const PAGE_SIZE = 12;
/** Below this, a word is not worth testing on the salvage path. */
const MIN_WORD = 2;
/** Where the salvage pass starts shedding words. More than this is a hopeless AND. */
const MAX_SALVAGE_WORDS = 4;
/** Typing settles before a search fires; Pagefind is fast but the index loads in shards. */
const DEBOUNCE_MS = 160;
/**
 * How long a query has to stand before it is reported. Every settled keystroke runs a
 * real search, and reporting each one would fill the property with the prefixes of words:
 * "k", "ke", "keb". A query still on screen after this long is one a reader meant.
 */
const REPORT_MS = 1200;

export class SiteSearch extends HTMLElement {
  #api: PagefindApi | null = null;
  #loading: Promise<PagefindApi> | null = null;
  #timer: number | undefined;
  #token = 0;
  #results: PagefindResult[] = [];
  #shown = 0;

  /** The spellings, fetched only for a search that matched something other than the
   *  words typed. Never on load, and never for a search that is going fine. */
  #paths: Paths | null = null;
  #pathsLoading: Promise<Paths | null> | null = null;
  #words: Set<string> | null = null;

  #input!: HTMLInputElement;
  #status!: HTMLElement;
  #list!: HTMLElement;
  #more!: HTMLButtonElement;
  /** The category and facet selects, in document order. Both default to All. */
  #selects: HTMLSelectElement[] = [];
  /** The modal's way out to /search, kept pointing at whatever is in the box. */
  #full: HTMLAnchorElement | null = null;
  #fullHref = '';
  /** Only the search PAGE owns the address bar; the modal is a guest on someone's page. */
  #syncs = false;
  /** 'page' or 'modal', so a report can tell a destination from an interruption. */
  #surface = 'page';
  #reportTimer: number | undefined;
  /** The headword of the top hit, for judging how close the match was. */
  #topResult: string | undefined;
  /** A reported search nobody has taken a result from yet. */
  #unanswered: { query: string; results: number } | null = null;

  /** Everything this element wired outside itself, so a swapped page takes it away. */
  #live: AbortController | undefined;

  connectedCallback() {
    this.#input = this.querySelector('[data-search-input]') as HTMLInputElement;
    this.#status = this.querySelector('[data-search-status]') as HTMLElement;
    this.#list = this.querySelector('[data-search-results]') as HTMLElement;
    this.#more = this.querySelector('[data-search-more]') as HTMLButtonElement;
    this.#full = this.querySelector('[data-search-full]');
    this.#fullHref = this.#full?.getAttribute('href') ?? '';
    this.#syncs = this.hasAttribute('data-sync-url');
    this.#surface = this.dataset.surface ?? 'page';
    if (!this.#input || !this.#status || !this.#list || !this.#more) return;

    this.#selects = [...this.querySelectorAll<HTMLSelectElement>('[data-search-filter]')];

    this.#input.addEventListener('input', () => this.#schedule());
    this.#input.addEventListener('search', () => this.#schedule());
    // A filter is a click rather than a keystroke, so it runs at once: there is no
    // half-typed state to wait out, and the debounce would only read as lag.
    for (const select of this.#selects) {
      select.addEventListener('change', () => {
        this.#paintFilters();
        clearTimeout(this.#timer);
        clearTimeout(this.#reportTimer);
        void this.#run(this.#input.value.trim());
      });
    }
    this.#more.addEventListener('click', () => this.#render(PAGE_SIZE));
    this.#list.addEventListener('click', (event) => this.#reportClick(event));
    // A search whose results nobody took is the strongest signal there is that the
    // vocabulary did not have the word. It can only be counted on the way out: when the
    // modal closes, when the page goes away under a reader who gave up, or when they
    // navigate off it, which under the router is a disconnect rather than a `pagehide`
    // and would otherwise lose exactly the report that matters most.
    const { signal } = (this.#live = new AbortController());
    this.closest('dialog')?.addEventListener('close', () => this.#reportUnanswered(), { signal });
    window.addEventListener('pagehide', () => this.#reportUnanswered(), { signal });
    // Leaving the modal for the full page is the same search continuing, not one given
    // up on: /search fires its own report from the query it arrives with.
    this.#full?.addEventListener('click', () => {
      this.#unanswered = null;
      clearTimeout(this.#reportTimer);
    });

    // A shared link should show its results, and the query survives a reload. Only where
    // the query is ours: `?q=` on a term page belongs to whatever put it there. The
    // filters travel the same way, so a narrowed search is a link someone can send.
    const params = this.#syncs ? new URLSearchParams(location.search) : new URLSearchParams();
    const initial = params.get('q') ?? '';
    for (const select of this.#selects) {
      const value = params.get(select.dataset.searchFilter ?? '');
      if (value && [...select.options].some((option) => option.value === value)) select.value = value;
    }
    this.#paintFilters();
    if (initial) this.#input.value = initial;
    if (initial || this.#filters()) void this.#run(initial);
    // Warm the index on first intent rather than on load, so a reader who never
    // searches never pays for it.
    this.#input.addEventListener('focus', () => void this.#pagefind(), { once: true });
  }

  /** What is narrowing the search, or undefined for All, which is Pagefind's own default. */
  #filters(): Filters | undefined {
    const filters: Filters = {};
    for (const select of this.#selects) {
      const key = select.dataset.searchFilter;
      if (key && select.value) filters[key] = select.value;
    }
    return Object.keys(filters).length > 0 ? filters : undefined;
  }

  /** The narrowing in the reader's words, for the status line: "component + forms". */
  #scope(): string {
    return this.#selects
      .filter((select) => select.value)
      .map((select) => select.selectedOptions[0]?.text ?? select.value)
      .join(' + ');
  }

  /** A filter that is narrowing something must not look like the All it started as. */
  #paintFilters() {
    for (const select of this.#selects) select.toggleAttribute('data-active', Boolean(select.value));
  }

  #schedule() {
    clearTimeout(this.#timer);
    clearTimeout(this.#reportTimer);
    const query = this.#input.value.trim();
    this.#timer = window.setTimeout(() => void this.#run(query), DEBOUNCE_MS);
  }

  #pagefind(): Promise<PagefindApi> {
    if (this.#api) return Promise.resolve(this.#api);
    if (this.#loading) return this.#loading;
    const bundle = this.dataset.bundle;
    const index = this.dataset.index;
    if (!bundle || !index) return Promise.reject(new Error('vd-search needs data-bundle and data-index'));
    this.#loading = import(/* @vite-ignore */ bundle)
      .then(async (mod: PagefindApi) => {
        await mod.options({ basePath: index });
        await mod.init();
        this.#api = mod;
        return mod;
      })
      .catch((error: unknown) => {
        this.#loading = null;
        throw error;
      });
    return this.#loading;
  }

  /** Called when the modal opens: warms the index (the focus listener) and lets a second
   * search start by typing instead of by clearing the first one. */
  focusInput() {
    this.#input?.focus();
    this.#input?.select();
  }

  async #run(query: string) {
    const token = ++this.#token;
    const filters = this.#filters();
    this.#syncUrl(query);
    this.#carryQuery(query);
    // A filter on its own is a real search: "every component", "every touch term". Only
    // an empty box with nothing narrowing it has nothing to run.
    if (query.length < 2 && !filters) {
      this.#results = [];
      this.#list.replaceChildren();
      this.#more.hidden = true;
      this.#say(query.length === 0 ? '' : 'Keep typing.');
      return;
    }
    this.#say('Searching...');
    let api: PagefindApi;
    try {
      api = await this.#pagefind();
    } catch {
      // The index is a build artifact, so a fresh clone has none and dev serves it from
      // the last build (see src/integrations/pagefind-dev.ts). Name the fix rather than
      // reporting a broken search.
      this.#say('No search index yet. Run `bun run build` once, then reload.');
      return;
    }
    const attempt =
      query.length < 2 ? { results: (await api.search(null, { filters })).results } : await this.#searchWithSalvage(api, query, filters);
    if (token !== this.#token) return; // A later keystroke already owns the results.
    this.#results = attempt.results;
    this.#shown = 0;
    this.#list.replaceChildren();
    const scope = this.#scope();
    if (this.#results.length === 0) {
      this.#more.hidden = true;
      this.#say(
        scope
          ? `Nothing for "${query}" in ${scope}. Widen the filter, or try the other name for it.`
          : `Nothing for "${query}". Aliases are indexed, so try the other name for it.`,
      );
      this.#scheduleReport(query, attempt);
      return;
    }
    const count = `${this.#results.length} ${this.#results.length === 1 ? 'result' : 'results'}`;
    const within = scope ? ` in ${scope}` : '';
    this.#say(`${count}${within}${this.#instead(query, attempt)}`);
    await this.#render(PAGE_SIZE);
    this.#scheduleReport(query, attempt);
  }

  /**
   * What a search is worth knowing about, in three events.
   *
   * `search` is every settled query that found something, carrying how close it got:
   * whether the top hit's headword contains what was typed, and whether the salvage pass
   * had to drop words to get there.
   *
   * `search_no_results` and `search_distant` are the two failures, split out under their
   * own names so they are visible without building a report: nothing at all, and
   * something only after dropping words. Both are reading lists for the vocabulary, an
   * alias to add or a term to write, which is the whole reason for measuring this.
   */
  #scheduleReport(query: string, attempt: Attempt) {
    clearTimeout(this.#reportTimer);
    // A filter with an empty box is browsing, not asking: there is no query to report.
    if (query.length < 2) return;
    const filters = this.#filters() ?? {};
    this.#reportTimer = window.setTimeout(() => {
      const results = attempt.results.length;
      const surface = this.#surface;
      if (results === 0) {
        track('search_no_results', {
          search_term: query,
          surface,
          words: query.split(/\s+/).filter(Boolean).length,
          ...filters,
        });
        this.#unanswered = null;
        return;
      }
      // Words are counted as dropped from the query that actually ran, so a search that
      // was both respelled and shortened is not charged for the respelling as well.
      const dropped = droppedWords(attempt.corrected ?? query, attempt.ran);
      track('search', {
        search_term: query,
        results,
        surface,
        top_result: this.#topResult,
        names_result: namesTopResult(attempt.corrected ?? query, this.#topResult),
        dropped_words: dropped,
        corrected: attempt.corrected,
        ...filters,
      });
      // A misspelling rescued is worth its own name for the same reason a failure is: a
      // slip that shows up hundreds of times is a spelling readers believe in, and the
      // fix for that one is an alias in the term's frontmatter, not a wider edit budget.
      if (attempt.corrected) {
        track('search_corrected', {
          search_term: query,
          corrected: attempt.corrected,
          results,
          surface,
          top_result: this.#topResult,
          ...filters,
        });
      }
      if (dropped > 0) {
        track('search_distant', {
          search_term: query,
          ran: attempt.ran,
          dropped_words: dropped,
          results,
          surface,
          top_result: this.#topResult,
          ...filters,
        });
      }
      this.#unanswered = { query, results };
    }, REPORT_MS);
  }

  /** Which result was taken, and how far down it was: position IS the relevance test. */
  #reportClick(event: MouseEvent) {
    const link = (event.target as Element | null)?.closest?.('a[data-position]');
    if (!(link instanceof HTMLAnchorElement)) return;
    this.#unanswered = null;
    clearTimeout(this.#reportTimer);
    track('search_result_click', {
      search_term: this.#input.value.trim(),
      position: Number(link.dataset.position),
      result: link.pathname,
      surface: this.#surface,
    });
  }

  disconnectedCallback() {
    // Leaving the page IS giving up on the search, so the report goes out before the
    // listener that would have made it is dropped.
    this.#reportUnanswered();
    clearTimeout(this.#timer);
    clearTimeout(this.#reportTimer);
    this.#live?.abort();
    this.#live = undefined;
  }

  #reportUnanswered() {
    if (!this.#unanswered) return;
    const { query, results } = this.#unanswered;
    this.#unanswered = null;
    track('search_abandoned', { search_term: query, results, surface: this.#surface });
  }

  /**
   * Pagefind requires every word to appear on the same page, so a sentence almost never
   * lands: "what do you call the little grip dots" is how a reader describes a thing
   * they cannot name (SPEC §1), and as a strict AND it matches nothing at all.
   *
   * So when a multi-word query comes back empty, score each word by how many pages it
   * hits on its own, which is a usable proxy for how much it narrows anything, then keep
   * the most selective few and drop the rest. Words the collection has never seen score
   * zero and go first. The reader is told which words actually ran, because showing
   * results for a question nobody asked is worse than showing none.
   *
   * Before any of that, the query gets two chances to be a word this dictionary knows,
   * misspelled: `skeumorphism` is not a failed search, it is a successful one with a
   * vowel in the wrong place, and the site already answers that slip at the other door
   * (`/skeumorphism` reaches the 404 page, which suggests the term). The spellings come
   * from `/paths.json` and the matching from `#src/lib/nearest.ts`, shared with it. First
   * the whole query as one headword, then word by word for a typo inside a longer
   * question, or for a word that is common here without being a term of its own.
   *
   * Both passes hang on `matchedTyping` rather than on a result count, because
   * Pagefind matches the last word of a query loosely and a typo therefore comes back
   * looking like a success: `tost` returns 1,060 results topped by "Back to top". Whether
   * this corpus contains a word can only be read off what the excerpt marked.
   */
  async #searchWithSalvage(api: PagefindApi, query: string, filters: Filters | undefined): Promise<Attempt> {
    const first = await api.search(query, { filters });
    if (first.results.length > 0 && (await this.#matched(query, first))) return { results: first.results };

    // A headword misspelled is the commonest way to fail here, because the thing a reader
    // types IS a name (SPEC §1) and `skeuomorphism` has a vowel most people put somewhere
    // else. Try the whole query as a name the dictionary knows before touching the words
    // individually, so a two-word term survives a typo in either half.
    const whole = await this.#respell(query);
    if (whole) {
      const attempt = await api.search(whole, { filters });
      if (attempt.results.length > 0) return { results: attempt.results, corrected: whole };
    }
    const words = query.split(/\s+/).filter((w) => w.length >= MIN_WORD);
    if (words.length === 0) return { results: first.results };

    // One probe per word does double duty: how much a word narrows anything, and whether
    // the corpus has that word at all. Only a word it has never marked is safe to
    // respell, because ordinary English the slugs happen to lack (`grip`, `dots`) sits
    // one edit from something that is a term, and correcting a reader who was right is
    // worse than finding nothing. `typograhpy` is the case this pass exists for: no term
    // is slugged `typography` (it is a category), so the whole-query pass above has
    // nothing to offer and the word itself is what needs fixing.
    const spellings = [...words];
    const scored: { index: number; word: string; hits: number }[] = [];
    let mended = false;
    for (const [index, word] of words.entries()) {
      let probe = await api.search(word, { filters });
      const known = probe.results.length > 0 && (await this.#matched(word, probe));
      if (!known) {
        const fix = await this.#respellWord(word);
        const retry = fix ? await api.search(fix, { filters }) : null;
        if (fix && retry && retry.results.length > 0) {
          spellings[index] = fix;
          probe = retry;
          mended = true;
        }
      }
      const spelling = spellings[index];
      if (spelling && probe.results.length > 0) scored.push({ index, word: spelling, hits: probe.results.length });
    }

    /** Whatever survives, in the order the reader typed it rather than in scoring order. */
    const asTyped = (kept: { index: number; word: string }[]) =>
      [...kept]
        .sort((a, b) => a.index - b.index)
        .map((s) => s.word)
        .join(' ');

    // A mended query is worth running whole before anything is dropped: fixing a spelling
    // is answering the question asked, and shedding words is answering a smaller one.
    const corrected = mended ? spellings.join(' ') : undefined;
    if (corrected) {
      const attempt = await api.search(corrected, { filters });
      if (attempt.results.length > 0) return { results: attempt.results, corrected };
    }
    // Nothing could be respelled. Whatever Pagefind found loosely is still better than an
    // empty page, and it is what this search did before any of this existed.
    if (first.results.length > 0) return { results: first.results };
    if (words.length < 2 || scored.length === 0) return { results: [] };

    // Narrow before widening: more words is a stricter AND, so start from a handful of
    // the most selective and shed one at a time until something lands.
    const selective = [...scored].sort((a, b) => a.hits - b.hits);
    for (let keep = Math.min(selective.length, MAX_SALVAGE_WORDS); keep >= 1; keep--) {
      const ran = asTyped(selective.slice(0, keep));
      if (ran === query) continue;
      const attempt = await api.search(ran, { filters });
      if (attempt.results.length > 0) return { results: attempt.results, ran, corrected };
    }
    return { results: [] };
  }

  /**
   * What ran, when it was not what was typed. A reader who is told "12 results" for a
   * word they know they misspelled has been quietly overruled, and a reader shown
   * results for half their sentence has been answered a question they did not ask, so
   * both rewrites say so in the reader's own words.
   */
  #instead(query: string, attempt: Attempt): string {
    const { corrected, ran } = attempt;
    if (corrected && ran) return ` for "${ran}", correcting the spelling of "${query}" and dropping the rest`;
    if (corrected) return ` for "${corrected}", since nothing here is spelled "${query}"`;
    if (ran) return ` for "${ran}", since the rest of that is not in any article`;
    return '';
  }

  /**
   * Whether a result set is about the words that were typed. Pagefind matches the last
   * word of a query loosely, so a count of results is not evidence that the word exists:
   * the excerpt of the top hit is, because `<mark>` surrounds what actually matched. This
   * is also what keeps the dictionary off the wire for an ordinary search, since a word
   * half typed matches the start of a marked word and never asks for a correction.
   */
  async #matched(query: string, search: PagefindSearch): Promise<boolean> {
    const top = search.results[0];
    if (!top) return false;
    const data = await top.data();
    return matchedTyping(query, data.excerpt);
  }

  /** The dictionary of every spelling the site answers to, fetched once and only on a
   *  search that already found nothing. Never fatal: a failed fetch is one fewer rescue. */
  #dictionary(): Promise<Paths | null> {
    if (this.#paths) return Promise.resolve(this.#paths);
    if (this.#pathsLoading) return this.#pathsLoading;
    const url = this.dataset.paths;
    if (!url) return Promise.resolve(null);
    this.#pathsLoading = fetch(url)
      .then((response) => response.json() as Promise<Paths>)
      .then((paths) => {
        this.#paths = paths;
        this.#words = vocabulary(paths);
        return paths;
      })
      .catch(() => null);
    return this.#pathsLoading;
  }

  /** The whole query as a headword, spelled the way this dictionary spells it. */
  async #respell(query: string): Promise<string | null> {
    const paths = await this.#dictionary();
    if (!paths) return null;
    const fixed = correction(query, paths);
    return fixed && fixed.toLowerCase() !== query.toLowerCase() ? fixed : null;
  }

  /** One word of a longer question, same rule. */
  async #respellWord(word: string): Promise<string | null> {
    await this.#dictionary();
    if (!this.#words) return null;
    return nearestWord(word, this.#words);
  }

  async #render(count: number) {
    const slice = this.#results.slice(this.#shown, this.#shown + count);
    const from = this.#shown;
    this.#shown += slice.length;
    const rendered = await Promise.all(slice.map((r) => r.data()));
    if (from === 0) this.#topResult = rendered[0]?.meta.title;
    for (const [index, data] of rendered.entries()) this.#list.append(this.#row(data, from + index + 1));
    this.#more.hidden = this.#shown >= this.#results.length;
    this.#more.textContent = `Show ${Math.min(PAGE_SIZE, this.#results.length - this.#shown)} more`;
  }

  #row(data: PagefindResultData, position: number): HTMLElement {
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = canonicalPath(data.url);
    link.dataset.position = String(position);
    link.className = 'group block rounded-lg border border-line bg-surface px-5 py-4 hover:border-accent';

    const name = document.createElement('span');
    name.className = 'font-serif text-lg font-semibold group-hover:text-accent';
    name.textContent = data.meta.title ?? data.url;
    link.append(name);

    if (data.meta.category) {
      const category = document.createElement('span');
      category.className = 'ml-2 text-sm text-muted';
      category.textContent = data.meta.category;
      link.append(category);
    }

    const excerpt = document.createElement('p');
    excerpt.className = 'mt-1 text-sm text-muted';
    // Pagefind's excerpt carries <mark> around the hit, which is the point of it.
    excerpt.innerHTML = data.excerpt;
    link.append(excerpt);

    li.append(link);
    return li;
  }

  #say(message: string) {
    this.#status.textContent = message;
  }

  /**
   * Hand the search to the full page, so leaving the modal loses neither the typing nor
   * the narrowing. Same parameter names the page reads on arrival, which is what makes
   * the handoff and a pasted link the same thing.
   */
  #carryQuery(query: string) {
    if (!this.#full) return;
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    for (const [key, value] of Object.entries(this.#filters() ?? {})) params.set(key, value);
    const search = params.toString();
    this.#full.href = search ? `${this.#fullHref}?${search}` : this.#fullHref;
  }

  /**
   * Keep the URL shareable without adding a history entry per keystroke.
   *
   * The existing state is carried over rather than replaced. The router keeps its own
   * bookkeeping there (which entry this is, and where the page was scrolled to), and a
   * `null` state is the one thing it cannot answer a Back button with: it returns early,
   * so the address bar would go back to the previous page and the search would stay on
   * screen. Typing in a field must not cost the reader their history.
   */
  #syncUrl(query: string) {
    if (!this.#syncs) return;
    const url = new URL(location.href);
    if (query) url.searchParams.set('q', query);
    else url.searchParams.delete('q');
    const filters = this.#filters() ?? {};
    for (const select of this.#selects) {
      const key = select.dataset.searchFilter;
      if (!key) continue;
      const value = filters[key];
      if (value) url.searchParams.set(key, value);
      else url.searchParams.delete(key);
    }
    history.replaceState(history.state, '', url);
  }
}

if (!customElements.get('vd-search')) customElements.define('vd-search', SiteSearch);
