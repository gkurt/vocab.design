import { steps } from '#src/stage/choreography.ts';

// No control is ever pressed: every page in this script is paid for with a scroll. The
// loading row is asserted the moment the scroll ends, since the request is already in
// flight by then (the sentinel comes near the bottom part way through the gesture).
export default steps([
  { assert: { selector: '[data-part=item-6]', state: 'visible' } },
  { assert: { selector: '[data-part=item-7]', state: 'hidden' } },
  { moveTo: '[data-part=feed]' },
  { scroll: { y: 140 } },
  { assert: { selector: '[data-part=sentinel][data-state="loading"]', state: 'visible' } },
  { wait: 1300 },
  { assert: { selector: '[data-part=item-10]', state: 'visible' } },
  { assert: { selector: '[data-part=item-11]', state: 'hidden' } },
  { assert: { selector: '[data-part=sentinel][data-state="idle"]', state: 'visible' } },
  { wait: 600 },
  { scroll: { y: 240 } },
  { assert: { selector: '[data-part=sentinel][data-state="loading"]', state: 'visible' } },
  { wait: 1300 },
  { assert: { selector: '[data-part=item-12]', state: 'visible' } },
  { assert: { selector: '[data-part=sentinel][data-state="end"]', state: 'visible' } },
  { wait: 1000 },
]);
