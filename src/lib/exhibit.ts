import type { Term } from '#src/lib/schema.ts';
import type { TermEntry } from '#src/lib/terms.ts';

/**
 * One specimen, reduced to what swapping it needs (SPEC §3). The whole pool is
 * serialized into the front page so the rotation can happen without a request, which
 * is why this is five fields and not a term: at a hundred exhibits it is still under
 * 15KB, and it never carries the article, the relations or the aliases.
 */
export interface Exhibit {
  slug: string;
  name: string;
  category: Term['category'];
  definition: string;
  /** Isolation mode, passed through to the stage (SPEC §6). */
  demo: 'inline' | 'iframe';
}

/**
 * The specimens cleared to stand in the window, alphabetically. A term qualifies by
 * carrying `exhibit: true` AND by having a specimen to show: the flag is curation, and
 * `bun validate` rejects the two combinations that would put an empty stage on the front
 * page, but this reads the same conditions rather than trusting the gate ran.
 */
export function exhibits(terms: TermEntry[]): Exhibit[] {
  return terms
    .filter((t) => t.data.exhibit && t.data.status === 'published' && t.data.demo !== 'none')
    .map(({ data }) => ({
      slug: data.slug,
      name: data.name,
      category: data.category,
      definition: data.definition,
      demo: data.demo as 'inline' | 'iframe',
    }))
    .sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }));
}

/**
 * Which exhibit the BUILT page carries, before any script runs. A reader with no
 * JavaScript still gets a specimen, and it moves with the deploy rather than being
 * frozen on whichever term sorts first: `day` is the build's day number, so the pick is
 * stable within a day (two builds of the same source produce the same page) and walks the
 * pool as the site is rebuilt.
 */
export function exhibitOfDay(pool: Exhibit[], day: number): Exhibit | undefined {
  if (pool.length === 0) return undefined;
  return pool[((day % pool.length) + pool.length) % pool.length];
}
