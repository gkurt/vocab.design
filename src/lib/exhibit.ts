import type { TermEntry } from '#src/lib/terms.ts';

/**
 * One specimen, reduced to what showing it in a card needs (SPEC §3). The front page
 * carries a dozen of these, so this is five fields and not a term: it never carries the
 * article, the relations or the aliases.
 */
export interface Exhibit {
  slug: string;
  name: string;
  definition: string;
  /** Isolation mode, passed through to the stage (SPEC §6). */
  demo: 'inline' | 'iframe';
}

/** How many specimens the front page's carousel carries in the page itself (SPEC §3). */
export const WINDOW_SIZE = 12;

/**
 * How many it fetches at a time once a reader stays long enough to run out (SPEC §3).
 * Sized against how long a row takes to watch rather than against the file: at six
 * seconds a specimen this is about ten minutes of carousel for five kilobytes, which is
 * more than anyone watches, and it leaves enough pages that two readers who do stay are
 * unlikely to be given the same one.
 */
export const PAGE_SIZE = 60;

const card = ({ data }: TermEntry): Exhibit => ({
  slug: data.slug,
  name: data.name,
  definition: data.definition,
  demo: data.demo as 'inline' | 'iframe',
});

const byName = (a: Exhibit, b: Exhibit) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' });

/**
 * Every term with a finished article and a specimen to show, alphabetically. The floor
 * under the front page: whatever it puts in the window has to be something a reader can
 * click through to and read.
 */
export function playable(terms: TermEntry[]): Exhibit[] {
  return terms
    .filter((t) => t.data.status === 'published' && t.data.demo !== 'none')
    .map(card)
    .sort(byName);
}

/**
 * The specimens cleared for the front page by hand, alphabetically. A term qualifies by
 * carrying `exhibit: true` AND by having a specimen to show: the flag is curation, and
 * `bun validate` rejects the two combinations that would put an empty stage on the front
 * page, but this reads the same conditions rather than trusting the gate ran.
 */
export function exhibits(terms: TermEntry[]): Exhibit[] {
  return playable(terms.filter((t) => t.data.exhibit));
}

/** The list read from `start`, wrapping, so a window can begin anywhere in it. */
function from<T>(list: T[], start: number): T[] {
  if (list.length === 0) return list;
  const at = ((start % list.length) + list.length) % list.length;
  return [...list.slice(at), ...list.slice(0, at)];
}

/**
 * What the front page's carousel draws on (SPEC §3): the curated pool when anything
 * is curated, and otherwise the vocabulary itself. An empty pool is not a reason for the
 * front page to show nothing, and a site whose whole claim is that every term has a
 * specimen can afford to open one at random.
 */
export function carouselPool(terms: TermEntry[]): Exhibit[] {
  const curated = exhibits(terms);
  return curated.length > 0 ? curated : playable(terms);
}

/** How many pages the feed is cut into, which is also the stride each page is dealt at. */
export function feedPages(terms: TermEntry[]): number {
  return Math.max(1, Math.ceil(carouselPool(terms).length / PAGE_SIZE));
}

/**
 * One page of the feed the carousel pulls from when it runs low (SPEC §3), 1-based.
 *
 * The pool is DEALT into the pages rather than cut into them, one term to each page in
 * turn, for the same reason the page's own dozen are taken at a stride: the pool is
 * alphabetical, so a page cut out of it would be sixty terms that all begin with the same
 * letter, and a reader who stays would watch the carousel work its way through the B's.
 */
export function feedPage(terms: TermEntry[], page: number): Exhibit[] {
  const pool = carouselPool(terms);
  const pages = Math.max(1, Math.ceil(pool.length / PAGE_SIZE));
  return pool.filter((_, i) => i % pages === (page - 1) % pages);
}

/**
 * The dozen the front page is BUILT with (SPEC §3), before the feed adds any.
 *
 * They are taken at a stride across the whole list rather than as a slice of it,
 * because the list is alphabetical: a slice is twelve terms that all begin with the same
 * two letters, which reads as a page of the dictionary rather than as a sample of it.
 *
 * Which dozen is a build-time decision, so every reader is served the same HTML and the
 * order they see it in is the only thing the script decides. `day` is the build's day
 * number and every pick moves with it, so the whole row turns over between deploys
 * instead of being frozen on whichever terms sort first.
 */
export function exhibitWindow(terms: TermEntry[], day: number): Exhibit[] {
  const pool = carouselPool(terms);
  if (pool.length <= WINDOW_SIZE) return from(pool, day);
  const stride = Math.floor(pool.length / WINDOW_SIZE);
  return Array.from({ length: WINDOW_SIZE }, (_, i) => pool[(day + i * stride) % pool.length]).filter((e): e is Exhibit => e !== undefined);
}
