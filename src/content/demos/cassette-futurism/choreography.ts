import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=panel]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { wait: 800 },
  // A panel at rest answers no pointer: the cursor reads it the way a hand would,
  // plate first, then the tube, then the controls.
  { moveTo: '[data-part=plate]' },
  { wait: 800 },
  { moveTo: '[data-part=screen]' },
  { wait: 900 },
  { assert: { selector: '[data-part=meter]', state: 'visible' } },
  { moveTo: '[data-part=toggle-b]' },
  { wait: 800 },
  { moveTo: '[data-part=rocker]' },
  { wait: 800 },
  { assert: { selector: '[data-part=switches]', state: 'visible' } },
  { assert: { selector: '[data-part=lamp]', state: 'visible' } },
  { wait: 600 },
]);
