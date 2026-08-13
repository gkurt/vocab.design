import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=panel][data-range="none"]', state: 'visible' } },
  { assert: { selector: '[data-part=day-8][data-in-range]', state: 'hidden' } },
  { moveTo: '[data-part=day-6]' },
  { wait: 300 },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=panel][data-range="start"]', state: 'visible' } },
  { assert: { selector: '[data-part=day-6][aria-selected="true"]', state: 'visible' } },
  // Between the two presses the span follows the pointer, which is the term itself.
  { moveTo: '[data-part=day-9]' },
  { wait: 400 },
  { assert: { selector: '[data-part=day-8][data-in-range]', state: 'visible' } },
  { assert: { selector: '[data-part=day-12][data-in-range]', state: 'hidden' } },
  { moveTo: '[data-part=day-13]' },
  { wait: 400 },
  { assert: { selector: '[data-part=day-12][data-in-range]', state: 'visible' } },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=panel][data-range="complete"]', state: 'visible' } },
  { assert: { selector: '[data-part=day-13][aria-selected="true"]', state: 'visible' } },
  { wait: 900 },
  // A preset names both ends at once, and lands as a range like any other.
  { moveTo: '[data-part=preset]' },
  { wait: 300 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=day-7][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=day-10][data-in-range]', state: 'visible' } },
  { wait: 800 },
]);
