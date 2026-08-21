import { describe, expect, test } from 'bun:test';
import { byLetter, glossaryEntries, LETTERS, letterOf, letterParam } from '#src/lib/glossary.ts';
import type { TermEntry } from '#src/lib/terms.ts';

/** Only the fields the glossary reads, so a schema change elsewhere cannot silently pass this. */
function term(name: string, slug: string, aliases: string[] = []): TermEntry {
  return {
    data: { name, slug, category: 'component', aliases: aliases.map((a) => ({ name: a })) },
  } as unknown as TermEntry;
}

describe('letterOf', () => {
  test('buckets by the slugified first character, so case and accents agree', () => {
    expect(letterOf('Kerning')).toBe('k');
    expect(letterOf('Bézier curve')).toBe('b');
    expect(letterOf('  overshoot')).toBe('o');
  });

  test('punctuation falls through to the first real letter, where readers look', () => {
    // All four are really in the collection, and none of them belongs under "Other".
    expect(letterOf('@mention')).toBe('m');
    expect(letterOf('@font-face')).toBe('f');
    expect(letterOf('.notdef')).toBe('n');
    expect(letterOf('-webkit-font-smoothing')).toBe('w');
  });

  test('a name that starts with a number has no letter to fall through to', () => {
    expect(letterOf('8pt grid')).toBe('#');
    expect(letterOf('60fps')).toBe('#');
    expect(letterOf('1.618')).toBe('#');
  });

  test('every bucket it can return is a letter the index knows about', () => {
    for (const label of ['Kerning', '@mention', '8pt grid', 'Zebra striping', '.notdef']) {
      expect(LETTERS as readonly string[]).toContain(letterOf(label));
    }
  });
});

describe('letterParam', () => {
  test('# becomes a URL-safe segment and letters pass through', () => {
    expect(letterParam('#')).toBe('other');
    expect(letterParam('k')).toBe('k');
  });
});

describe('glossaryEntries', () => {
  const entries = glossaryEntries([term('Kerning', 'kerning', ['kern', 'metric kerning']), term('Toast', 'toast', ['snackbar'])]);

  test('lists every term and every alias', () => {
    expect(entries.map((e) => e.label)).toEqual(['kern', 'Kerning', 'metric kerning', 'snackbar', 'Toast']);
  });

  test('sorts case-insensitively, so an alias is not exiled below the terms', () => {
    // A plain localeCompare would put every lowercase alias after every capitalised term.
    expect(entries[0]?.label).toBe('kern');
    expect(entries[1]?.label).toBe('Kerning');
  });

  test('an alias carries the term it resolves to, a term carries none', () => {
    const alias = entries.find((e) => e.label === 'snackbar');
    expect(alias?.canonical).toEqual({ name: 'Toast', slug: 'toast' });
    expect(alias?.href).toBe('/snackbar');
    expect(entries.find((e) => e.label === 'Toast')?.canonical).toBeUndefined();
  });

  test('an alias href is the slugified alias, which is the redirect page that exists', () => {
    expect(entries.find((e) => e.label === 'metric kerning')?.href).toBe('/metric-kerning');
  });
});

describe('byLetter', () => {
  test('every letter is present even when empty, so the index can skip them deliberately', () => {
    const groups = byLetter(glossaryEntries([term('Toast', 'toast')]));
    expect([...groups.keys()]).toEqual([...LETTERS]);
    expect(groups.get('t')?.length).toBe(1);
    expect(groups.get('a')?.length).toBe(0);
  });

  test('nothing is dropped on the way into the buckets', () => {
    const entries = glossaryEntries([term('Kerning', 'kerning', ['kern']), term('8pt grid', 'eight-point-grid', ['8 point grid'])]);
    const total = [...byLetter(entries).values()].reduce((n, list) => n + list.length, 0);
    expect(total).toBe(entries.length);
    expect(byLetter(entries).get('#')?.length).toBe(2);
  });
});
