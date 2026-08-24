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

import { droppedWords, namesTopResult } from '#src/lib/search-signals.ts';
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
    // modal closes, or when the page goes away under a reader who gave up.
    this.closest('dialog')?.addEventListener('close', () => this.#reportUnanswered());
    window.addEventListener('pagehide', () => this.#reportUnanswered());
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
    this.#say(attempt.ran ? `${count}${within} for "${attempt.ran}", since the rest of that is not in any article` : `${count}${within}`);
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
      const dropped = droppedWords(query, attempt.ran);
      track('search', {
        search_term: query,
        results,
        surface,
        top_result: this.#topResult,
        names_result: namesTopResult(query, this.#topResult),
        dropped_words: dropped,
        ...filters,
      });
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
   */
  async #searchWithSalvage(api: PagefindApi, query: string, filters: Filters | undefined): Promise<Attempt> {
    const first = await api.search(query, { filters });
    if (first.results.length > 0) return { results: first.results };

    const words = query.split(/\s+/).filter((w) => w.length >= MIN_WORD);
    if (words.length < 2) return { results: [] };

    const scored: { word: string; hits: number }[] = [];
    for (const word of words) {
      const probe = await api.search(word, { filters });
      if (probe.results.length > 0) scored.push({ word, hits: probe.results.length });
    }
    if (scored.length === 0) return { results: [] };
    scored.sort((a, b) => a.hits - b.hits);

    // Narrow before widening: more words is a stricter AND, so start from a handful of
    // the most selective and shed one at a time until something lands.
    for (let keep = Math.min(scored.length, MAX_SALVAGE_WORDS); keep >= 1; keep--) {
      const kept = new Set(scored.slice(0, keep).map((s) => s.word));
      const ran = words.filter((w) => kept.has(w)).join(' ');
      if (ran === query) continue;
      const attempt = await api.search(ran, { filters });
      if (attempt.results.length > 0) return { results: attempt.results, ran };
    }
    return { results: [] };
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

  /** Keep the URL shareable without adding a history entry per keystroke. */
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
    history.replaceState(null, '', url);
  }
}

if (!customElements.get('vd-search')) customElements.define('vd-search', SiteSearch);
