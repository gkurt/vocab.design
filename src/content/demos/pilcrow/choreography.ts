import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 500 },
  { assert: { selector: '[data-part=body][data-marks=shown]', state: 'visible' } },
  { assert: { selector: '[data-part=pilcrow]', state: 'visible' } },
  { moveTo: '[data-part=body]' },
  { wait: 700 },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  // Absolute picks, never a flip: each segment names the state it reaches, and the pass
  // ends with the marks on, which is the state the subject is drawn in.
  { moveTo: '[data-part=seg-hidden]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=body][data-marks=hidden]', state: 'visible' } },
  { assert: { selector: '[data-part=pilcrow]', state: 'hidden' } },
  { moveTo: '[data-part=seg-shown]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=body][data-marks=shown]', state: 'visible' } },
  { assert: { selector: '[data-part=pilcrow]', state: 'visible' } },
  { wait: 700 },
]);
