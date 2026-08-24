import { describe, expect, test } from 'bun:test';
import { exhibits, exhibitWindow, feedPage, feedPages, PAGE_SIZE, playable, WINDOW_SIZE } from '#src/lib/exhibit.ts';
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

describe('playable', () => {
  test('is every published term with a specimen, flagged or not', () => {
    const pool = playable([term('toast', 'Toast', { exhibit: false }), term('modal', 'Modal'), term('stub', 'Stub', { status: 'stub' })]);
    expect(pool.map((e) => e.slug)).toEqual(['modal', 'toast']);
  });
});

describe('exhibitWindow', () => {
  const many = (n: number) => Array.from({ length: n }, (_, i) => term(`t${i}`, `Term ${String(i).padStart(2, '0')}`, { exhibit: false }));

  test('prefers the curated pool whenever anything is curated', () => {
    const window = exhibitWindow([...many(30), term('toast', 'Toast')], 0);
    expect(window.map((e) => e.slug)).toEqual(['toast']);
  });

  test('falls back to the vocabulary, so an uncurated front page still opens a specimen', () => {
    expect(exhibitWindow(many(30), 0)).toHaveLength(WINDOW_SIZE);
  });

  test('takes them at a stride, so a row is a sample of the list and not a page of it', () => {
    // 30 terms, twelve picks: every other one, rather than the first twelve.
    expect(exhibitWindow(many(30), 0).map((e) => e.slug)).toEqual([
      't0',
      't2',
      't4',
      't6',
      't8',
      't10',
      't12',
      't14',
      't16',
      't18',
      't20',
      't22',
    ]);
  });

  test('turns the whole row over between deploys', () => {
    const terms = many(30);
    const a = exhibitWindow(terms, 0).map((e) => e.slug);
    const b = exhibitWindow(terms, 1).map((e) => e.slug);
    expect(a.some((slug) => b.includes(slug))).toBe(false);
  });

  test('wraps rather than running out at the end of the list', () => {
    const window = exhibitWindow(many(30), 25);
    expect(window).toHaveLength(WINDOW_SIZE);
    expect(new Set(window.map((e) => e.slug)).size).toBe(WINDOW_SIZE);
  });

  test('a pool no bigger than the row is the whole pool, rotated', () => {
    const window = exhibitWindow(many(5), 1);
    expect(window.map((e) => e.slug)).toEqual(['t1', 't2', 't3', 't4', 't0']);
  });

  test('is stable for one day, so two builds of one source agree', () => {
    const terms = many(30);
    expect(exhibitWindow(terms, 20_000).map((e) => e.slug)).toEqual(exhibitWindow(terms, 20_000).map((e) => e.slug));
  });

  test('nothing to show is an empty window, not a crash', () => {
    expect(exhibitWindow([], 7)).toEqual([]);
  });
});

describe('the feed', () => {
  const many = (n: number) => Array.from({ length: n }, (_, i) => term(`t${i}`, `Term ${String(i).padStart(4, '0')}`, { exhibit: false }));

  test('cuts the pool into as few pages as PAGE_SIZE allows', () => {
    expect(feedPages(many(PAGE_SIZE * 3))).toBe(3);
    expect(feedPages(many(PAGE_SIZE * 3 + 1))).toBe(4);
    expect(feedPages([])).toBe(1);
  });

  test('deals the pool into the pages rather than cutting it, so a page is a spread', () => {
    const terms = many(PAGE_SIZE * 3);
    // Three pages, so page one is every third term from the top of the alphabet.
    expect(
      feedPage(terms, 1)
        .map((e) => e.slug)
        .slice(0, 3),
    ).toEqual(['t0', 't3', 't6']);
    expect(
      feedPage(terms, 2)
        .map((e) => e.slug)
        .slice(0, 3),
    ).toEqual(['t1', 't4', 't7']);
  });

  test('every term is on exactly one page', () => {
    const terms = many(PAGE_SIZE * 3 + 7);
    const dealt = [1, 2, 3, 4].flatMap((page) => feedPage(terms, page).map((e) => e.slug));
    expect(dealt).toHaveLength(PAGE_SIZE * 3 + 7);
    expect(new Set(dealt).size).toBe(dealt.length);
  });

  test('reads the curated pool when there is one, exactly as the row does', () => {
    const terms = [...many(80), term('toast', 'Toast')];
    expect(feedPages(terms)).toBe(1);
    expect(feedPage(terms, 1).map((e) => e.slug)).toEqual(['toast']);
  });
});
