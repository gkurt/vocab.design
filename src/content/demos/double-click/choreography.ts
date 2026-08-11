import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=detail]', state: 'hidden' } },
  { moveTo: '[data-part=tile-2]' },
  { click: true },
  { wait: 500 },
  // One press selects and stops there: the gesture the term names has not happened yet.
  { assert: { selector: '[data-part=tile-2][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=detail]', state: 'hidden' } },
  { wait: 700 },
  // Two presses on the same tile, and the second one means something else entirely.
  { dblclick: true },
  { wait: 500 },
  { assert: { selector: '[data-part=detail]', state: 'visible' } },
  { assert: { selector: '[data-part=detail-empty]', state: 'hidden' } },
  { wait: 1200 },
  { moveTo: '[data-part=detail-close]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=detail]', state: 'hidden' } },
  { wait: 900 },
]);
