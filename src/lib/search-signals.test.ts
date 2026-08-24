import { describe, expect, test } from 'bun:test';
import { droppedWords, matchedTyping, namesTopResult } from '#src/lib/search-signals.ts';

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

describe('matchedTyping', () => {
  test('the word is really there when Pagefind marked that word', () => {
    // Column resizer genuinely says "grip", so a reader who typed it was right.
    expect(matchedTyping('grip', 'column <mark>grip,</mark> resize <mark>gripper.</mark>')).toBe(true);
  });

  test('a loose match on the last word is not the word', () => {
    // Pagefind matched `according` for `accordian` and `to` for `tost`, and both came
    // back with results, which is why a result count cannot be trusted here.
    expect(matchedTyping('accordian', 'changes what it says and does <mark>according</mark> to')).toBe(false);
    expect(matchedTyping('tost', 'Back <mark>to</mark> top. also called scroll <mark>to</mark> top')).toBe(false);
  });

  test('every word has to be there, not just the easy one', () => {
    expect(matchedTyping('bento grid', '<mark>bento</mark> box layout')).toBe(false);
    expect(matchedTyping('bento grid', 'a <mark>bento</mark> <mark>grid</mark> of cards')).toBe(true);
  });

  test('a word half typed is a word being found, not a word misspelled', () => {
    // Every settled keystroke is a search, so this is most of them, and the correction
    // pass has to stay out of the way (and off the wire) while someone is still typing.
    expect(matchedTyping('skeuo', 'realistic UI. <mark>Skeuomorphism</mark> makes')).toBe(true);
    expect(matchedTyping('bread', 'a <mark>breadcrumbs</mark> trail')).toBe(true);
  });

  test('nothing marked and nothing typed are both a no', () => {
    expect(matchedTyping('toast', 'a plain excerpt with no mark in it')).toBe(false);
    expect(matchedTyping('', '<mark>toast</mark>')).toBe(false);
  });
});
