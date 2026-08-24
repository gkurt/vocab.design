import { describe, expect, test } from 'bun:test';
import { TAGS } from '#src/lib/schema.ts';
import { derivedTags, FAMILY_FLOOR, facets, familyOf, isTermTag, TAG_BLURBS, TERM_TAGS } from '#src/lib/tags.ts';
import type { TermEntry } from '#src/lib/terms.ts';

type Fields = { tags?: string[]; variantOf?: string[]; partOf?: string[]; contrastWith?: string[] };

/** Only the fields a facet reads, so a schema change elsewhere cannot silently pass this. */
function term(slug: string, name: string, { tags = [], ...edges }: Fields = {}): TermEntry {
  return {
    data: {
      slug,
      name,
      category: 'pattern',
      definition: `${name}, defined.`,
      tags,
      relations: { variantOf: [], partOf: [], contrastWith: [], seeAlso: [], ...edges },
    },
  } as unknown as TermEntry;
}

// The real facets, so a rename in TERM_TAGS fails here rather than rendering nothing.
const [DARK, MICRO] = TERM_TAGS;

const collection = [
  term(DARK, 'Dark pattern'),
  term(MICRO, 'Microinteraction'),
  term('nagging', 'Nagging', { variantOf: [DARK] }),
  term('confirmshaming', 'Confirmshaming', { variantOf: [DARK], tags: ['commerce'] }),
  term('ripple', 'Ripple', { partOf: [MICRO] }),
  term('pull-to-refresh', 'Pull to refresh', { variantOf: [MICRO], tags: ['touch', 'scroll'] }),
  term('flat-design', 'Flat design', { contrastWith: [DARK] }),
  term('inline-validation', 'Inline validation', { tags: ['forms'] }),
];

const entry = (slug: string) => collection.find((t) => t.data.slug === slug) as TermEntry;
const facet = (tag: string) => facets(collection).find((f) => f.tag === tag);

describe('facets', () => {
  test('a term-named facet collects the terms whose relations declare it, never its `tags`', () => {
    // None of these three carries `tags: [dark-pattern]`, and `bun validate` rejects one
    // that does: the relation is the single record of membership (SPEC §2.5).
    expect(facet(DARK)?.terms.map((t) => t.data.slug)).toEqual(['confirmshaming', 'nagging']);
  });

  test('an ordinary facet still collects what declares it in frontmatter', () => {
    expect(facet('forms')?.terms.map((t) => t.data.slug)).toEqual(['inline-validation']);
    expect(facet('touch')?.terms.map((t) => t.data.slug)).toEqual(['pull-to-refresh']);
  });

  test('contrasting with a term-named facet is not being in it', () => {
    expect(facet(DARK)?.terms.map((t) => t.data.slug)).not.toContain('flat-design');
  });

  test('a term-named facet reads as its word and carries the term the word is defined on', () => {
    expect(facet(DARK)?.label).toBe('dark pattern');
    expect(facet(DARK)?.term?.data.slug).toBe(DARK);
  });

  test('an ordinary facet reads as the tag and has no term behind it', () => {
    expect(facet('perceived-performance')?.label).toBe('perceived-performance');
    expect(facet('perceived-performance')?.term).toBeUndefined();
  });

  test('every tag in the enum gets a row, in the enum order', () => {
    expect(facets(collection).map((f) => f.tag)).toEqual([...TAGS]);
  });

  test('the facet a term names does not collect that term itself', () => {
    expect(facet(DARK)?.terms.map((t) => t.data.slug)).not.toContain(DARK);
  });
});

describe('familyOf', () => {
  test('the same members, split into kinds and parts, in the words the Related rail uses', () => {
    expect(familyOf(entry(MICRO), collection)?.groups.map((g) => [g.label, g.terms.map((t) => t.data.slug)])).toEqual([
      ['Variants', ['pull-to-refresh']],
      ['Contains', ['ripple']],
    ]);
  });

  test('an empty group is dropped rather than headed with nothing under it', () => {
    expect(familyOf(entry(DARK), collection)?.groups.map((g) => g.label)).toEqual(['Variants']);
  });

  test('it agrees with the facet page about who the members are', () => {
    const members = familyOf(entry(MICRO), collection)
      ?.members.map((t) => t.data.slug)
      .sort();
    expect(members).toEqual(
      facet(MICRO)
        ?.terms.map((t) => t.data.slug)
        .sort(),
    );
  });

  test('a term that does not name a facet has no family at all', () => {
    expect(familyOf(entry('nagging'), collection)).toBeUndefined();
  });

  test('it is empty only for a partial collection, which validate rules out for real ones', () => {
    expect(familyOf(entry(DARK), [entry(DARK)])?.members).toEqual([]);
  });
});

describe('derivedTags', () => {
  test('names the term-named facets a term is in, for the chips beside its declared tags', () => {
    expect(derivedTags(entry('nagging'))).toEqual([DARK]);
    expect(derivedTags(entry('ripple'))).toEqual([MICRO]);
  });

  test('contrast is not membership', () => {
    expect(derivedTags(entry('flat-design'))).toEqual([]);
  });

  test('a term-named facet is not in itself', () => {
    expect(derivedTags(entry(DARK))).toEqual([]);
  });

  test('an ordinary tag is never derived: it is declared or it is absent', () => {
    expect(derivedTags(entry('inline-validation'))).toEqual([]);
  });
});

describe('the closed enum', () => {
  test('every tag has a blurb, which is its whole editorial content on the facet page', () => {
    for (const tag of TAGS) expect(TAG_BLURBS[tag]).toBeTruthy();
  });

  test('every term-named facet is a tag in the enum', () => {
    for (const tag of TERM_TAGS) expect(TAGS as readonly string[]).toContain(tag);
  });

  test('isTermTag answers for the enum and for anything else', () => {
    expect(isTermTag(DARK)).toBe(true);
    expect(isTermTag('forms')).toBe(false);
    expect(isTermTag('skeuomorphism')).toBe(false);
  });

  test('the floor that forces a family into the enum is the facet floor', () => {
    expect(FAMILY_FLOOR).toBe(8);
  });
});
