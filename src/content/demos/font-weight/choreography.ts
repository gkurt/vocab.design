import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=ramp]', state: 'visible' } },
  { assert: { selector: '[data-part=sample-300]', state: 'visible' } },
  { wait: 700 },
  // Nothing here answers a pointer: a weight is not a control, so the cursor only
  // walks the ramp the way a reader comparing two strokes would.
  { moveTo: '[data-part=sample-300]' },
  { wait: 900 },
  { moveTo: '[data-part=sample-700]' },
  { wait: 1000 },
  { assert: { selector: '[data-part=sample-700]', state: 'visible' } },
  { moveTo: '[data-part=applied]' },
  { wait: 1000 },
  { assert: { selector: '[data-part=applied]', state: 'visible' } },
  { wait: 700 },
]);
