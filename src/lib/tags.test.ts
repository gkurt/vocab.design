import { describe, expect, test } from 'bun:test';
import { TAGS } from '#src/lib/schema.ts';
import { FAMILY_FLOOR, families, familyOf, HEAD_TERMS, memberOf, TAG_BLURBS } from '#src/lib/tags.ts';
import type { TermEntry } from '#src/lib/terms.ts';

type Edges = { variantOf?: string[]; partOf?: string[]; contrastWith?: string[]; seeAlso?: string[] };

/** Only the fields a family reads, so a schema change elsewhere cannot silently pass this. */
function term(slug: string, name: string, edges: Edges = {}): TermEntry {
  return {
    data: {
      slug,
      name,
      category: 'pattern',
      definition: `${name}, defined.`,
      relations: { variantOf: [], partOf: [], contrastWith: [], seeAlso: [], ...edges },
    },
  } as unknown as TermEntry;
}

// The real head terms, so a rename in HEAD_TERMS fails here rather than rendering nothing.
const [DARK, , MICRO, SKEUO] = HEAD_TERMS.map((head) => head.slug) as [string, string, string, string];

const collection = [
  term(DARK, 'Dark pattern'),
  term(MICRO, 'Microinteraction'),
  term(SKEUO, 'Skeuomorphism', { contrastWith: ['flat-design'] }),
  term('nagging', 'Nagging', { variantOf: [DARK] }),
  term('confirmshaming', 'Confirmshaming', { variantOf: [DARK] }),
  term('ripple', 'Ripple', { partOf: [MICRO] }),
  term('pull-to-refresh', 'Pull to refresh', { variantOf: [MICRO] }),
  term('flat-design', 'Flat design', { contrastWith: [SKEUO] }),
];

const head = (slug: string) => collection.find((t) => t.data.slug === slug) as TermEntry;

describe('familyOf', () => {
  test('collects the members that declare the head term, name-sorted', () => {
    const family = familyOf(head(DARK), collection);
    expect(family?.members.map((t) => t.data.slug)).toEqual(['confirmshaming', 'nagging']);
  });

  test('splits kinds from parts, in the words the Related rail uses', () => {
    const family = familyOf(head(MICRO), collection);
    expect(family?.groups.map((g) => [g.label, g.terms.map((t) => t.data.slug)])).toEqual([
      ['Variants', ['pull-to-refresh']],
      ['Contains', ['ripple']],
    ]);
  });

  test('a term that is not a head term has no family at all', () => {
    expect(familyOf(head('nagging'), collection)).toBeUndefined();
  });

  test('a head term whose neighbours only contrast with it carries an empty family', () => {
    // Skeuomorphism: the page discriminates rather than lists, and it stays a head term
    // so a reader hunting the facet list for the word is still handed the term (SPEC §2.5).
    const family = familyOf(head(SKEUO), collection);
    expect(family?.members).toEqual([]);
    expect(family?.groups).toEqual([]);
  });

  test('an empty group is dropped rather than rendered as a heading with nothing under it', () => {
    expect(familyOf(head(DARK), collection)?.groups.map((g) => g.label)).toEqual(['Variants']);
  });
});

describe('families', () => {
  test('every registered head term present in the collection, in declaration order', () => {
    expect(families(collection).map((f) => f.slug)).toEqual([DARK, MICRO, SKEUO]);
  });

  test('a head term missing from the collection is skipped, never rendered as a blank row', () => {
    expect(families(collection.filter((t) => t.data.slug !== DARK)).map((f) => f.slug)).toEqual([MICRO, SKEUO]);
  });
});

describe('memberOf', () => {
  test('names the family a term declares, for the chip beside its tags', () => {
    expect(memberOf(head('nagging'))).toEqual([DARK]);
    expect(memberOf(head('ripple'))).toEqual([MICRO]);
  });

  test('contrasting with a head term is not joining its family', () => {
    expect(memberOf(head('flat-design'))).toEqual([]);
  });

  test('a head term is not a member of itself', () => {
    expect(memberOf(head(DARK))).toEqual([]);
  });
});

describe('the closed enum and the head terms', () => {
  test('every tag has a blurb, which is the whole of its editorial content', () => {
    for (const tag of TAGS) expect(TAG_BLURBS[tag]).toBeTruthy();
  });

  test('no head term is also a tag: a family carried twice is what the rule prevents', () => {
    for (const { slug } of HEAD_TERMS) expect(TAGS as readonly string[]).not.toContain(slug);
  });

  test('the family floor is the facet floor, read from the other side', () => {
    expect(FAMILY_FLOOR).toBe(8);
  });
});
