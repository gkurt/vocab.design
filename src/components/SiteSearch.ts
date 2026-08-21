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
  search(query: string): Promise<PagefindSearch>;
}

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
  /** The modal's way out to /search, kept pointing at whatever is in the box. */
  #full: HTMLAnchorElement | null = null;
  #fullHref = '';
  /** Only the search PAGE owns the address bar; the modal is a guest on someone's page. */
  #syncs = false;

  connectedCallback() {
    this.#input = this.querySelector('[data-search-input]') as HTMLInputElement;
    this.#status = this.querySelector('[data-search-status]') as HTMLElement;
    this.#list = this.querySelector('[data-search-results]') as HTMLElement;
    this.#more = this.querySelector('[data-search-more]') as HTMLButtonElement;
    this.#full = this.querySelector('[data-search-full]');
    this.#fullHref = this.#full?.getAttribute('href') ?? '';
    this.#syncs = this.hasAttribute('data-sync-url');
    if (!this.#input || !this.#status || !this.#list || !this.#more) return;

    this.#input.addEventListener('input', () => this.#schedule());
    this.#input.addEventListener('search', () => this.#schedule());
    this.#more.addEventListener('click', () => this.#render(PAGE_SIZE));

    // A shared link should show its results, and the query survives a reload. Only where
    // the query is ours: `?q=` on a term page belongs to whatever put it there.
    const initial = this.#syncs ? new URLSearchParams(location.search).get('q') : null;
    if (initial) {
      this.#input.value = initial;
      void this.#run(initial);
    }
    // Warm the index on first intent rather than on load, so a reader who never
    // searches never pays for it.
    this.#input.addEventListener('focus', () => void this.#pagefind(), { once: true });
  }

  #schedule() {
    clearTimeout(this.#timer);
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
    this.#syncUrl(query);
    this.#carryQuery(query);
    if (query.length < 2) {
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
    const attempt = await this.#searchWithSalvage(api, query);
    if (token !== this.#token) return; // A later keystroke already owns the results.
    this.#results = attempt.results;
    this.#shown = 0;
    this.#list.replaceChildren();
    if (this.#results.length === 0) {
      this.#more.hidden = true;
      this.#say(`Nothing for "${query}". Aliases are indexed, so try the other name for it.`);
      return;
    }
    const count = `${this.#results.length} ${this.#results.length === 1 ? 'result' : 'results'}`;
    this.#say(attempt.ran ? `${count} for "${attempt.ran}", since the rest of that is not in any article` : count);
    await this.#render(PAGE_SIZE);
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
  async #searchWithSalvage(api: PagefindApi, query: string): Promise<Attempt> {
    const first = await api.search(query);
    if (first.results.length > 0) return { results: first.results };

    const words = query.split(/\s+/).filter((w) => w.length >= MIN_WORD);
    if (words.length < 2) return { results: [] };

    const scored: { word: string; hits: number }[] = [];
    for (const word of words) {
      const probe = await api.search(word);
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
      const attempt = await api.search(ran);
      if (attempt.results.length > 0) return { results: attempt.results, ran };
    }
    return { results: [] };
  }

  async #render(count: number) {
    const slice = this.#results.slice(this.#shown, this.#shown + count);
    this.#shown += slice.length;
    const rendered = await Promise.all(slice.map((r) => r.data()));
    for (const data of rendered) this.#list.append(this.#row(data));
    this.#more.hidden = this.#shown >= this.#results.length;
    this.#more.textContent = `Show ${Math.min(PAGE_SIZE, this.#results.length - this.#shown)} more`;
  }

  #row(data: PagefindResultData): HTMLElement {
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = data.url;
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

  /** Hand the query to the full page, so leaving the modal does not lose the typing. */
  #carryQuery(query: string) {
    if (!this.#full) return;
    this.#full.href = query ? `${this.#fullHref}?q=${encodeURIComponent(query)}` : this.#fullHref;
  }

  /** Keep the URL shareable without adding a history entry per keystroke. */
  #syncUrl(query: string) {
    if (!this.#syncs) return;
    const url = new URL(location.href);
    if (query) url.searchParams.set('q', query);
    else url.searchParams.delete('q');
    history.replaceState(null, '', url);
  }
}

if (!customElements.get('vd-search')) customElements.define('vd-search', SiteSearch);
