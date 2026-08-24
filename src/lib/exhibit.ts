import type { Term } from '#src/lib/schema.ts';
import type { TermEntry } from '#src/lib/terms.ts';

/**
 * One specimen, reduced to what showing it in a card needs (SPEC §3). The front page
 * carries a dozen of these, so this is five fields and not a term: it never carries the
 * article, the relations or the aliases.
 */
export interface Exhibit {
  slug: string;
  name: string;
  category: Term['category'];
  definition: string;
  /** Isolation mode, passed through to the stage (SPEC §6). */
  demo: 'inline' | 'iframe';
}

/** How many specimens the front page's carousel carries (SPEC §3). */
export const WINDOW_SIZE = 12;

const card = ({ data }: TermEntry): Exhibit => ({
  slug: data.slug,
  name: data.name,
  category: data.category,
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
 * What the front page's carousel is built from (SPEC §3): the curated pool when anything
 * is curated, and otherwise the vocabulary itself. An empty pool is not a reason for the
 * front page to show nothing, and a site whose whole claim is that every term has a
 * specimen can afford to open one at random.
 *
 * The dozen are taken at a stride across the whole list rather than as a slice of it,
 * because the list is alphabetical: a slice is twelve terms that all begin with the same
 * two letters, which reads as a page of the dictionary rather than as a sample of it.
 *
 * Which dozen is a build-time decision, so every reader is served the same HTML and the
 * order they see it in is the only thing the script decides. `day` is the build's day
 * number and every pick moves with it, so the whole row turns over between deploys
 * instead of being frozen on whichever terms sort first.
 */
export function exhibitWindow(terms: TermEntry[], day: number): Exhibit[] {
  const curated = exhibits(terms);
  const pool = curated.length > 0 ? curated : playable(terms);
  if (pool.length <= WINDOW_SIZE) return from(pool, day);
  const stride = Math.floor(pool.length / WINDOW_SIZE);
  return Array.from({ length: WINDOW_SIZE }, (_, i) => pool[(day + i * stride) % pool.length]).filter((e): e is Exhibit => e !== undefined);
}
