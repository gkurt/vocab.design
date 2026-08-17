import { steps } from '#src/stage/choreography.ts';

// A question typed a character at a time, then answered with a panel rather than a
// paragraph. The range picker inside the panel proves it is a working interface and not
// a picture of one, and Clear returns the specimen to its mount state (SPEC §8).
export default steps([
  { wait: 600 },
  { assert: { selector: '[data-part=placeholder]', state: 'visible' } },
  { assert: { selector: '[data-part=result]', state: 'hidden' } },
  { wait: 400 },
  { moveTo: '[data-part=prompt]' },
  { type: 'spending by category' },
  { wait: 400 },
  { moveTo: '[data-part=ask]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=result][data-range="month"]', state: 'visible' } },
  { assert: { selector: '[data-part=stat-0]', state: 'visible' } },
  { assert: { selector: '[data-part=recipe]', state: 'visible' } },
  { assert: { selector: '[data-part=placeholder]', state: 'hidden' } },
  { wait: 1100 },
  { moveTo: '[data-part=range-quarter]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=result][data-range="quarter"]', state: 'visible' } },
  { assert: { selector: '[data-part=stat-1]', state: 'visible' } },
  { wait: 1100 },
  { moveTo: '[data-part=clear]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=result]', state: 'hidden' } },
  { assert: { selector: '[data-part=placeholder]', state: 'visible' } },
  { wait: 800 },
]);
