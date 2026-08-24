import { describe, expect, test } from 'bun:test';
import { pageType } from '#src/lib/page-type.ts';

describe('pageType', () => {
  test('names each shape of page', () => {
    expect(pageType('/')).toBe('home');
    expect(pageType('/toast')).toBe('term');
    expect(pageType('/browse/component')).toBe('category');
    expect(pageType('/glossary')).toBe('glossary');
    expect(pageType('/glossary/s')).toBe('letter');
    expect(pageType('/glossary/other')).toBe('letter');
    expect(pageType('/tags/a11y')).toBe('facet');
    expect(pageType('/search')).toBe('search');
  });

  test('reads through a trailing slash, which is how the site is served', () => {
    expect(pageType('/toast/')).toBe('term');
    expect(pageType('/browse/component/')).toBe('category');
    expect(pageType('/tags/a11y/')).toBe('facet');
  });

  test('strips the base, or the home page of a subpath deploy reads as a term', () => {
    expect(pageType('/vocab.design/', '/vocab.design')).toBe('home');
    expect(pageType('/vocab.design/', '/vocab.design/')).toBe('home');
    expect(pageType('/vocab.design/toast', '/vocab.design')).toBe('term');
    expect(pageType('/vocab.design/browse/component', '/vocab.design')).toBe('category');
    expect(pageType('/vocab.design/tags/a11y', '/vocab.design')).toBe('facet');
  });

  test('a term named like a route is still a term, because only the tail decides', () => {
    // No term may slugify to a reserved route (scripts/validate-terms.ts), so the only
    // way "search" can appear is as the route itself.
    expect(pageType('/search-suggestion')).toBe('term');
    expect(pageType('/browse-abandonment')).toBe('term');
  });
});
