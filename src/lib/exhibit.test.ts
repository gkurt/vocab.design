import { describe, expect, test } from 'bun:test';
import { exhibitOfDay, exhibits } from '#src/lib/exhibit.ts';
import type { TermEntry } from '#src/lib/terms.ts';

type Fields = { exhibit?: boolean; status?: string; demo?: string };

/** Only the fields the window reads, so a schema change elsewhere cannot silently pass this. */
function term(slug: string, name: string, { exhibit = true, status = 'published', demo = 'inline' }: Fields = {}): TermEntry {
  return {
    data: { slug, name, category: 'pattern', definition: `${name}, defined.`, exhibit, status, demo },
  } as unknown as TermEntry;
}

describe('exhibits', () => {
  test('collects the flagged specimens, alphabetically by name', () => {
    const pool = exhibits([term('toast', 'Toast'), term('breadcrumb', 'Breadcrumb'), term('skeleton', 'Skeleton')]);
    expect(pool.map((e) => e.slug)).toEqual(['breadcrumb', 'skeleton', 'toast']);
  });

  test('leaves out everything unflagged', () => {
    expect(exhibits([term('toast', 'Toast', { exhibit: false })])).toEqual([]);
  });

  test('refuses a flagged term with no specimen, and a flagged stub', () => {
    expect(exhibits([term('toast', 'Toast', { demo: 'none' })])).toEqual([]);
    expect(exhibits([term('toast', 'Toast', { status: 'stub' })])).toEqual([]);
  });

  test('carries the isolation mode through, so the stage is built the way the term page builds it', () => {
    const [framed] = exhibits([term('view-transition', 'View transition', { demo: 'iframe' })]);
    expect(framed?.demo).toBe('iframe');
  });
});

describe('exhibitOfDay', () => {
  const pool = exhibits([term('a', 'Alpha'), term('b', 'Beta'), term('c', 'Gamma')]);

  test('walks the pool as the days pass, and comes back around', () => {
    expect([0, 1, 2, 3].map((d) => exhibitOfDay(pool, d)?.slug)).toEqual(['a', 'b', 'c', 'a']);
  });

  test('is stable for one day, so two builds of one source agree', () => {
    expect(exhibitOfDay(pool, 20_000)).toBe(exhibitOfDay(pool, 20_000));
  });

  test('an empty pool has nothing to show', () => {
    expect(exhibitOfDay([], 7)).toBeUndefined();
  });
});
