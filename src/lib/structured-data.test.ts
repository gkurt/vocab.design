import { describe, expect, test } from 'bun:test';
import { CATEGORIES } from '#src/lib/schema.ts';
import { IDS, siteGraph } from '#src/lib/structured-data.ts';

const DESCRIPTION = 'Design and UI terms with live demos, aliases, and the connections between them.';
const graph = siteGraph({ description: DESCRIPTION, termCount: 1076 });
const nodes = graph['@graph'];
/** JSON-LD nodes are open records, so the assertions reach into them by name. */
const node = (type: string) => nodes.find((n) => n['@type'] === type) as Record<string, any>;

describe('siteGraph', () => {
  test('is one context with every node under it', () => {
    expect(graph['@context']).toBe('https://schema.org');
    expect(nodes.map((n) => n['@type'])).toEqual(['Organization', 'Person', 'WebSite', 'DefinedTermSet', 'Dataset']);
  });

  test('every node carries the three fields an agent reads first', () => {
    for (const n of nodes) {
      expect(typeof n['@id']).toBe('string');
      expect(typeof n.name).toBe('string');
      expect(typeof n.description).toBe('string');
      expect(typeof n.url).toBe('string');
    }
  });

  test('the description is the front page’s own, so the meta tag cannot disagree', () => {
    expect(node('WebSite').description).toBe(DESCRIPTION);
    expect(node('Organization').description).toBe(DESCRIPTION);
  });

  test('references are by @id rather than by a second copy of the publisher', () => {
    expect(node('WebSite').publisher).toEqual({ '@id': IDS.publisher });
    expect(node('WebSite').author).toEqual({ '@id': IDS.author });
    expect(node('WebSite').mainEntity).toEqual({ '@id': IDS.dictionary });
    expect(node('DefinedTermSet').publisher).toEqual({ '@id': IDS.publisher });
    expect(node('Dataset').creator).toEqual({ '@id': IDS.publisher });
    expect(node('Organization').founder).toEqual({ '@id': IDS.author });
  });

  test('every @id an edge points at is a node in the graph', () => {
    const declared = new Set(nodes.map((n) => n['@id']));
    const referenced = [...JSON.stringify(graph).matchAll(/\{"@id":"([^"]+)"\}/g)].map((m) => m[1]);
    expect(referenced.length).toBeGreaterThan(0);
    for (const id of referenced) expect(declared.has(id as string)).toBe(true);
  });

  test('the organization states a contact that reaches someone, and no postal address', () => {
    const org = node('Organization');
    expect(org.contactPoint).toHaveLength(1);
    expect(org.contactPoint[0]['@type']).toBe('ContactPoint');
    expect(org.contactPoint[0].contactType).toBe('technical support');
    expect(org.contactPoint[0].url).toBe('https://github.com/gkurt/vocab.design/issues');
    expect(org.address).toBeUndefined();
    expect(JSON.stringify(org)).not.toContain('@gmail');
  });

  test('the author is the same person the header links to with rel=me', () => {
    expect(node('Person').sameAs).toEqual(['https://github.com/gkurt', 'https://x.com/gkurttech']);
  });

  test('search is declared as an action, with the query the search page reads', () => {
    const action = node('WebSite').potentialAction;
    expect(action['@type']).toBe('SearchAction');
    expect(action.target.urlTemplate).toBe('https://vocab.design/search?q={search_term_string}');
    expect(action['query-input']).toBe('required name=search_term_string');
  });

  test('the term set names every category page rather than restating the headwords', () => {
    const parts = node('DefinedTermSet').hasPart;
    expect(parts.map((p: { name: string }) => p.name)).toEqual([...CATEGORIES]);
    for (const part of parts) expect(part.url).toBe(`https://vocab.design/browse/${part.name}`);
  });

  test('the dataset points at all three exports and counts the terms it holds', () => {
    const dataset = node('Dataset');
    expect(dataset.description).toContain('1,076 terms');
    expect(dataset.isAccessibleForFree).toBe(true);
    expect(dataset.distribution.map((d: { contentUrl: string }) => d.contentUrl)).toEqual([
      'https://vocab.design/terms.json',
      'https://vocab.design/llms-full.txt',
      'https://vocab.design/paths.json',
    ]);
  });

  test('everything is licensed the way the content is', () => {
    for (const type of ['WebSite', 'DefinedTermSet', 'Dataset']) {
      expect(node(type).license).toBe('https://creativecommons.org/licenses/by/4.0/');
    }
  });

  test('serializes, which is what the page actually ships', () => {
    expect(() => JSON.parse(JSON.stringify(graph))).not.toThrow();
  });
});
