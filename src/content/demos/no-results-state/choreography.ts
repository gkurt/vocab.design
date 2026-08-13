import { steps } from '#src/stage/choreography.ts';

// The query lands a character at a time, which is how a list actually empties: the
// results survive the first letters and then run out. Clearing the search is the
// explicit way back, so nothing here flips a state it found (SPEC §8).
export default steps([
  { assert: { selector: '[data-part=results]', state: 'visible' } },
  { assert: { selector: '[data-part=noresults]', state: 'hidden' } },
  { moveTo: '[data-part=query]' },
  { wait: 350 },
  { type: 'chiar' },
  { wait: 500 },
  { assert: { selector: '[data-part=noresults][data-query="chiar"]', state: 'visible' } },
  { assert: { selector: '[data-part=results]', state: 'hidden' } },
  // The suggestion is computed, not written into the markup: the state attribute is
  // the only way a script can see that the arithmetic ran.
  { assert: { selector: '[data-part=suggest][data-word="chair"]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=clear]' },
  { wait: 300 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=noresults]', state: 'hidden' } },
  { assert: { selector: '[data-part=item-reading-lamp]', state: 'visible' } },
  { wait: 1000 },
]);
