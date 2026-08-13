import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=slot][data-at=step-1][data-axis=x][data-state=settled]', state: 'visible' } },
  { moveTo: '[data-part=go-step-2]' },
  { click: true },
  // Judged inside the 500 ms move: both views are travelling the same line at once.
  { assert: { selector: '[data-part=slot][data-state=moving]', state: 'visible' } },
  { wait: 700 },
  { assert: { selector: '[data-part=slot][data-at=step-2][data-axis=x][data-state=settled]', state: 'visible' } },
  { assert: { selector: '[data-part=panel-step-2][data-current]', state: 'visible' } },
  { assert: { selector: '[data-part=panel-step-1]', state: 'hidden' } },
  { wait: 500 },
  // Same pair, a different line: the axis is the claim about how the views are arranged.
  { moveTo: '[data-part=axis-y]' },
  { click: true },
  { assert: { selector: '[data-part=slot][data-axis=y]', state: 'visible' } },
  { moveTo: '[data-part=go-step-1]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=slot][data-at=step-1][data-axis=y][data-state=settled]', state: 'visible' } },
  { assert: { selector: '[data-part=panel-step-1][data-current]', state: 'visible' } },
  { wait: 400 },
  // Depth is the third axis, and it is drawn as scale rather than as travel.
  { moveTo: '[data-part=axis-z]' },
  { click: true },
  { assert: { selector: '[data-part=slot][data-axis=z]', state: 'visible' } },
  { moveTo: '[data-part=go-step-2]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=slot][data-at=step-2][data-axis=z][data-state=settled]', state: 'visible' } },
  { assert: { selector: '[data-part=panel-step-2][data-current]', state: 'visible' } },
  { wait: 600 },
]);
