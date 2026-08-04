import { describe, expect, test } from 'bun:test';
import { slugify } from '#src/lib/slug.ts';

describe('slugify', () => {
  test('lowercases and hyphenates', () => {
    expect(slugify('Segmented Control')).toBe('segmented-control');
  });

  test('strips diacritics', () => {
    expect(slugify('Bézier curve')).toBe('bezier-curve');
  });

  test('collapses punctuation and whitespace runs', () => {
    expect(slugify('Pull  to refresh!')).toBe('pull-to-refresh');
    expect(slugify('sr-only / visually hidden')).toBe('sr-only-visually-hidden');
  });

  test('trims leading and trailing separators', () => {
    expect(slugify('  ...kebab menu...  ')).toBe('kebab-menu');
  });
});
