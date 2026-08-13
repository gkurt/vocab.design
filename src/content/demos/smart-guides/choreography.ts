import { steps } from '#src/stage/choreography.ts';

// The drop is aimed four pixels off the neighbour's left edge, so the exact landing
// position is the proof that the guide snapped the card rather than merely drawing a
// line near it. The guides leaving on release is asserted too: it is half the term.
export default steps([
  { assert: { selector: '[data-part=guide-v]', state: 'hidden' } },
  { assert: { selector: '[data-part=card][data-snapped="none"]', state: 'visible' } },
  { moveTo: '[data-part=card]' },
  { wait: 400 },
  { drag: { to: '[data-part=target]' } },
  { wait: 500 },
  { assert: { selector: '[data-part=card][data-x="32"][data-snapped="left"]', state: 'visible' } },
  { assert: { selector: '[data-part=guide-v]', state: 'hidden' } },
  { wait: 900 },
  // A line that only exists mid-gesture leaves identify nothing to ring, so the
  // specimen carries a labelled state that holds it on. Both picks are absolute.
  { moveTo: '[data-part=hold-on]' },
  { wait: 300 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=guide-v]', state: 'visible' } },
  { assert: { selector: '[data-part=badge]', state: 'visible' } },
  { wait: 1500 },
  { moveTo: '[data-part=hold-drag]' },
  { wait: 300 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=guide-v]', state: 'hidden' } },
  { wait: 1000 },
]);
