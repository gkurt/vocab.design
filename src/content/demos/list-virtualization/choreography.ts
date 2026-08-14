import { steps } from '#src/stage/choreography.ts';

// Every claim here is about the document, not the data: the row count in the DOM never
// changes, the rows that were there have genuinely gone, and the numbers prove where in
// the ten thousand the scroller landed. Scrolls run from a mount at the top, so each
// stop is an absolute position (SPEC §8).
export default steps([
  { assert: { selector: '[data-part=row-1]', state: 'visible' } },
  { assert: { selector: '[data-part=row-13]', state: 'visible' } },
  { assert: { selector: '[data-part=row-14]', state: 'hidden' } },
  { assert: { selector: '[data-part=readout][data-count="13"]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=viewport]' },
  { scroll: { y: 600 } },
  { wait: 500 },
  { assert: { selector: '[data-part=row-1]', state: 'hidden' } },
  { assert: { selector: '[data-part=row-27]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-count="13"]', state: 'visible' } },
  { wait: 700 },
  { scroll: { y: 2400 } },
  { wait: 500 },
  { assert: { selector: '[data-part=row-27]', state: 'hidden' } },
  { assert: { selector: '[data-part=row-127]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-count="13"]', state: 'visible' } },
  { wait: 800 },
  // Back to the top: the rows that left are rebuilt, which is the other half of the trick.
  { scroll: { y: -3000 } },
  { wait: 500 },
  { assert: { selector: '[data-part=row-1]', state: 'visible' } },
  { assert: { selector: '[data-part=row-127]', state: 'hidden' } },
  { wait: 1000 },
]);
