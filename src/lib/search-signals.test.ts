import { describe, expect, test } from 'bun:test';
import { droppedWords, namesTopResult } from '#src/lib/search-signals.ts';

describe('namesTopResult', () => {
  test('a name typed is a name matched, whatever the case', () => {
    expect(namesTopResult('kebab menu', 'Kebab menu')).toBe(true);
    expect(namesTopResult('KEBAB', 'Kebab menu')).toBe(true);
  });

  test('punctuation is not part of how anyone types', () => {
    expect(namesTopResult('font face', '@font-face')).toBe(true);
    expect(namesTopResult('aria hidden', 'aria-hidden')).toBe(true);
  });

  test('an alias match is not a name match, because aliases are not in the headword', () => {
    // The honest limit of this signal: "snackbar" is an alias of Toast and a perfectly
    // good hit, but it matched the article body, so it reads as a described search.
    expect(namesTopResult('snackbar', 'Toast')).toBe(false);
  });

  test('a described thing does not match the name it landed on', () => {
    expect(namesTopResult('the little grip dots', 'Drag handle')).toBe(false);
    expect(namesTopResult('menu three dots', 'Kebab menu')).toBe(false);
  });

  test('nothing to compare is not a match', () => {
    expect(namesTopResult('toast', undefined)).toBe(false);
    expect(namesTopResult('   ', 'Toast')).toBe(false);
  });
});

describe('droppedWords', () => {
  test('counts what the salvage pass had to shed', () => {
    expect(droppedWords('the little grip dots', 'grip dots')).toBe(2);
    expect(droppedWords('what do you call the grip dots', 'grip dots')).toBe(5);
  });

  test('a search that ran as typed dropped nothing', () => {
    expect(droppedWords('grip dots', undefined)).toBe(0);
    expect(droppedWords('grip dots', 'grip dots')).toBe(0);
  });
});
