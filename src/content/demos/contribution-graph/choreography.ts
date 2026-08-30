import { steps } from '#src/stage/choreography.ts';

// A year at a glance, then the two readings the picture cannot give on its own: the count
// behind one dense square, and the count behind a day that held nothing. The same detail is
// then reached with the arrow keys, walking one week per press across the last three columns,
// which is the keyboard path the term's own accessibility history is about.
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=grid]', state: 'visible' } },
  { assert: { selector: '[data-part=legend]', state: 'visible' } },
  { assert: { selector: '[data-part=cell-338][data-level="4"]', state: 'visible' } },
  { assert: { selector: '[data-part=cell-352][data-level="0"]', state: 'visible' } },
  { assert: { selector: '[data-part=tip]', state: 'hidden' } },
  { moveTo: '[data-part=cell-338]' },
  { wait: 460 },
  { assert: { selector: '[data-part=tip][data-open]', state: 'visible' } },
  { assert: { selector: '[data-part=tip][data-count="9"]', state: 'visible' } },
  { assert: { selector: '[data-part=cell-338][data-active]', state: 'visible' } },
  { wait: 1100 },
  { moveTo: '[data-part=cell-352]' },
  { wait: 460 },
  { assert: { selector: '[data-part=tip][data-count="0"]', state: 'visible' } },
  { assert: { selector: '[data-part=cell-352][data-active]', state: 'visible' } },
  { assert: { selector: '[data-part=cell-338][data-active]', state: 'hidden' } },
  { wait: 900 },
  { press: 'ArrowRight' },
  { wait: 340 },
  { assert: { selector: '[data-part=cell-359][data-active]', state: 'visible' } },
  { press: 'ArrowRight' },
  { wait: 420 },
  { assert: { selector: '[data-part=cell-366][data-active]', state: 'visible' } },
  { assert: { selector: '[data-part=tip][data-count="7"]', state: 'visible' } },
  { wait: 1000 },
  // Off the grid entirely, at a line of prose well clear of it: the label belongs to the
  // square under the pointer and goes with it.
  { moveTo: '[data-part=away]' },
  { wait: 420 },
  { assert: { selector: '[data-part=tip][data-open]', state: 'hidden' } },
  { wait: 600 },
]);
