import { steps } from '#src/stage/choreography.ts';

// The drop is aimed at the first row and lands *above* it, which is the proof that the
// line in the gap, not the row under the pointer, is what the release obeyed. The line
// leaving with the gesture is asserted too: it is half the term (SPEC §8).
export default steps([
  { assert: { selector: '[data-part=list][data-order="tide-ferry-slip-harbour"]', state: 'visible' } },
  { assert: { selector: '[data-part=indicator]', state: 'hidden' } },
  { moveTo: '[data-part=grip-harbour]' },
  { wait: 400 },
  { drag: { to: '[data-part=row-tide]' } },
  { wait: 600 },
  { assert: { selector: '[data-part=list][data-order="harbour-tide-ferry-slip"]', state: 'visible' } },
  { assert: { selector: '[data-part=row-harbour][data-index="0"]', state: 'visible' } },
  { assert: { selector: '[data-part=indicator]', state: 'hidden' } },
  { wait: 900 },
  // A line that exists only mid-gesture leaves identify nothing to ring, so the
  // specimen carries a labelled state that holds it on. Both picks are absolute.
  { moveTo: '[data-part=hold-on]' },
  { wait: 300 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=indicator][data-slot="2"]', state: 'visible' } },
  { wait: 1500 },
  { moveTo: '[data-part=hold-drag]' },
  { wait: 300 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=indicator]', state: 'hidden' } },
  { wait: 1000 },
]);
