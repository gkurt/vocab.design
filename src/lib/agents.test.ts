import { describe, expect, test } from 'bun:test';
import { MACHINE_ROUTES, WHEN_TO_USE } from '#src/lib/agents.ts';

const prose = WHEN_TO_USE.join('\n');

describe('WHEN_TO_USE', () => {
  test('names the jobs the dictionary is for, not the site that serves them', () => {
    expect(prose).toContain('## When to use this');
    expect(prose).toContain('## How to call it');
  });

  test('says what it is NOT for, which is the half a marketing blurb leaves out', () => {
    expect(prose).toContain('It is not an implementation reference');
  });

  test('every fetchable path it names is one the site publishes', () => {
    const paths = [...prose.matchAll(/(?<![\w/.])\/[a-z-]+(?:\.(?:json|txt|md))?/g)].map((m) => m[0]);
    expect(paths.length).toBeGreaterThan(0);
    const published = new Set(['/llms-full.txt', '/terms.json', '/paths.json', '/search', '/{slug}.md', '/snackbar', '/toast']);
    for (const path of paths) expect(published.has(path)).toBe(true);
  });

  test('says an alias has no markdown twin, which is the one URL an agent would guess wrong', () => {
    expect(prose).toContain('no markdown twin');
  });

  test('names all four exports an agent can fetch whole', () => {
    for (const path of ['/llms-full.txt', '/terms.json', '/paths.json']) expect(prose).toContain(path);
    expect(prose).toContain('/{slug}.md');
  });

  test('house style: no em-dashes and no contractions (SPEC §2.4)', () => {
    expect(prose).not.toContain('—');
    expect(prose).not.toMatch(/\b\w+['’](?:s|t|re|ll|ve|d|m)\b/);
  });
});

describe('MACHINE_ROUTES', () => {
  test('offers the map, the dataset, the URL list and the sitemap', () => {
    expect(MACHINE_ROUTES.map((r) => r.href)).toEqual(['/llms.txt', '/terms.json', '/paths.json', '/sitemap-index.xml']);
  });

  test('every href is site-absolute, so pageUrl can prefix the deploy base', () => {
    for (const route of MACHINE_ROUTES) expect(route.href.startsWith('/')).toBe(true);
  });

  test('every entry carries a name to click and a blurb saying what it holds', () => {
    for (const route of MACHINE_ROUTES) {
      expect(route.name.length).toBeGreaterThan(0);
      expect(route.blurb.length).toBeGreaterThan(0);
      expect(route.blurb).not.toContain('—');
    }
  });
});
