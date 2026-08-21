import { describe, expect, test } from 'bun:test';
import { canonicalPath } from '#src/lib/url.ts';

describe('canonicalPath', () => {
  test('drops the file name Astro reports under build.format: file', () => {
    expect(canonicalPath('/toast.html')).toBe('/toast');
    expect(canonicalPath('/browse/component.html')).toBe('/browse/component');
  });

  test('an index file is its directory', () => {
    expect(canonicalPath('/index.html')).toBe('/');
    expect(canonicalPath('/browse/index.html')).toBe('/browse');
  });

  test('leaves a path that is already the published spelling', () => {
    expect(canonicalPath('/')).toBe('/');
    expect(canonicalPath('/toast')).toBe('/toast');
  });

  test('one spelling only: the trailing slash goes', () => {
    expect(canonicalPath('/toast/')).toBe('/toast');
  });
});
