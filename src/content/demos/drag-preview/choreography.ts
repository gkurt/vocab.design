import { steps } from '#src/stage/choreography.ts';

// The drag itself is one step, so the copy is made and let go inside it: what the script can
// prove afterwards is that the release obeyed the gesture and that the copy left with it.
// The parked state is what gives identify something to ring, and both picks are absolute
// rather than a toggle (SPEC §8).
export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=preview]', state: 'hidden' } },
  { assert: { selector: '[data-part=list][data-order="tide-ferry-slip-bell"]', state: 'visible' } },
  { moveTo: '[data-part=grip-slip]' },
  { wait: 400 },
  { drag: { to: '[data-part=row-tide]' } },
  { wait: 700 },
  { assert: { selector: '[data-part=list][data-order="slip-tide-ferry-bell"]', state: 'visible' } },
  { assert: { selector: '[data-part=row-slip][data-index="0"]', state: 'visible' } },
  { assert: { selector: '[data-part=preview]', state: 'hidden' } },
  { assert: { selector: '[data-part=row-slip][data-lifted]', state: 'hidden' } },
  { wait: 1000 },
  { moveTo: '[data-part=hold-on]' },
  { wait: 300 },
  { click: true },
  { wait: 600 },
  // The copy, and the faint slot it was taken from, both held still to be looked at.
  { assert: { selector: '[data-part=preview][data-carrying=slip]', state: 'visible' } },
  { assert: { selector: '[data-part=row-slip][data-lifted]', state: 'visible' } },
  { wait: 1700 },
  { moveTo: '[data-part=hold-drag]' },
  { wait: 300 },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=preview]', state: 'hidden' } },
  { assert: { selector: '[data-part=row-slip][data-lifted]', state: 'hidden' } },
  { wait: 900 },
]);
