import { describe, expect, test } from 'bun:test';
import { correction, distance, editBudget, nearest, nearestWord, type Paths, vocabulary } from '#src/lib/nearest.ts';

const paths: Paths = {
  terms: {
    accordion: 'Accordion',
    'bento-grid': 'Bento grid',
    breadcrumbs: 'Breadcrumbs',
    modal: 'Modal',
    model: 'Model',
    'segmented-control': 'Segmented control',
    skeuomorphism: 'Skeuomorphism',
    tab: 'Tab',
    toast: 'Toast',
  },
  aliases: { snackbar: 'toast', 'dialog-box': 'modal', lab: 'toast' },
};

describe('distance', () => {
  test('a transposition is one slip of two fingers, not two edits', () => {
    expect(distance('tosat', 'toast', 2)).toBe(1);
    expect(distance('skeuomrophism', 'skeuomorphism', 2)).toBe(1);
  });

  test('the ordinary edits still cost one each', () => {
    expect(distance('skeumorphism', 'skeuomorphism', 2)).toBe(1); // a dropped letter
    expect(distance('accordian', 'accordion', 2)).toBe(1); // a swapped vowel
    expect(distance('toasst', 'toast', 2)).toBe(1); // a doubled letter
  });

  test('nothing to fix is no distance at all', () => {
    expect(distance('toast', 'toast', 2)).toBe(0);
  });

  test('past the cap the answer is only that it is past the cap', () => {
    expect(distance('accordion', 'skeuomorphism', 2)).toBeGreaterThan(2);
    expect(distance('a', 'segmented-control', 1)).toBeGreaterThan(1);
  });
});

describe('editBudget', () => {
  test('short words are left alone, because this vocabulary is full of near neighbours', () => {
    // `tab` is one edit from `lab`, `nav` from `navy`: a budget that reaches them
    // corrects readers who typed exactly what they meant.
    expect(editBudget('tab')).toBe(0);
    expect(editBudget('grid')).toBe(1);
  });

  test('a longer word has more room to go wrong in', () => {
    expect(editBudget('toast')).toBe(1);
    expect(editBudget('skeuomorphism')).toBe(2);
  });
});

describe('correction', () => {
  test('the reported case: a vowel in the wrong place is not a failed search', () => {
    expect(correction('skeumorphism', paths)).toBe('Skeuomorphism');
  });

  test('a multi-word headword survives a typo in either half', () => {
    expect(correction('segmented controll', paths)).toBe('Segmented control');
    expect(correction('bento gird', paths)).toBe('Bento grid');
  });

  test('an alias is a spelling too, corrected to itself rather than to its term', () => {
    // Pagefind indexes aliases at weight 8, so searching the alias finds Toast anyway,
    // and telling the reader we ran "snackbar" is the truth about what ran.
    expect(correction('snakbar', paths)).toBe('snackbar');
  });

  test('a word spelled right is not corrected to another word', () => {
    expect(correction('toast', paths)).toBeNull();
    expect(correction('accordion', paths)).toBeNull();
  });

  test('an alias is a spelling the site answers to, so it is right as it stands', () => {
    expect(correction('snackbar', paths)).toBeNull();
  });

  test('a word half typed is not a word misspelled', () => {
    // Every settled keystroke runs a search, and Pagefind prefix-matches on its own, so
    // announcing a correction here would be finishing the reader's word for them.
    expect(correction('breadcrum', paths)).toBeNull();
    expect(correction('skeuomorphis', paths)).toBeNull();
  });

  test('a tie between two terms is answered with nothing, not with a coin flip', () => {
    // "Showing results for" is a claim. `modl` is one edit from Modal and from Model,
    // and picking one would be right half the time.
    expect(correction('modl', paths)).toBeNull();
  });

  test('a short word is nobody else nearby', () => {
    expect(correction('tap', paths)).toBeNull();
  });

  test('a described thing is not a misspelled headword', () => {
    expect(correction('what do you call the little grip dots', paths)).toBeNull();
    expect(correction('', paths)).toBeNull();
  });
});

describe('vocabulary and nearestWord', () => {
  const words = vocabulary(paths);

  test('a multi-word slug contributes each of its words', () => {
    expect(words.has('segmented')).toBe(true);
    expect(words.has('control')).toBe(true);
    expect(words.has('bento')).toBe(true);
  });

  test('one word of a longer question, spelled the way the dictionary spells it', () => {
    expect(nearestWord('segmentd', words)).toBe('segmented');
    expect(nearestWord('acordion', words)).toBe('accordion');
  });

  test('a word the dictionary already has is never respelled', () => {
    expect(nearestWord('modal', words)).toBeNull();
    expect(nearestWord('Toast', words)).toBeNull();
  });

  test('ambiguity and short words both come back empty-handed', () => {
    expect(nearestWord('modl', words)).toBeNull();
    expect(nearestWord('tap', words)).toBeNull();
  });

  test('a word from nowhere near this vocabulary stays as it was typed', () => {
    expect(nearestWord('mortgage', words)).toBeNull();
  });
});

describe('nearest', () => {
  test('an alias reports the term it resolves to, so a link never bounces', () => {
    const [best] = nearest('snakbar', paths, { cap: 2 });
    expect(best?.slug).toBe('snackbar');
    expect(best?.target).toBe('toast');
  });

  test('containment is the other kind of near miss, and it belongs to the 404 page', () => {
    const found = nearest('grid', paths, { cap: 4, contains: true });
    expect(found.map((n) => n.slug)).toContain('bento-grid');
    // Off by default: a correction that runs a search on the reader's behalf must not
    // reach a term that merely contains what they typed.
    expect(nearest('grid', paths, { cap: 4 }).map((n) => n.slug)).not.toContain('bento-grid');
  });

  test('nearest first, then the shorter word, so the order is never arbitrary', () => {
    const found = nearest('toas', paths, { cap: 2 });
    expect(found[0]?.slug).toBe('toast');
  });
});
