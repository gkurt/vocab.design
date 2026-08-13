import { steps } from '#src/stage/choreography.ts';

// The control is not there to be dismissed: the scroll summons it and the press
// spends it, so each step reaches a state rather than flipping one (SPEC §8).
export default steps([
  { assert: { selector: '[data-part=totop]', state: 'hidden' } },
  { assert: { selector: '[data-part=doc][data-at="top"]', state: 'visible' } },
  { moveTo: '[data-part=doc]' },
  { scroll: { y: 300 } },
  { wait: 500 },
  { assert: { selector: '[data-part=doc][data-at="away"]', state: 'visible' } },
  { assert: { selector: '[data-part=totop][data-shown]', state: 'visible' } },
  { wait: 500 },
  { scroll: { y: 220 } },
  { wait: 500 },
  { moveTo: '[data-part=totop]' },
  { wait: 300 },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=doc][data-at="top"]', state: 'visible' } },
  { assert: { selector: '[data-part=totop]', state: 'hidden' } },
  { wait: 1000 },
]);
