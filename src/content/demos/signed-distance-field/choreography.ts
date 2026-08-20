import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 500 },
  { assert: { selector: '[data-part=tile-field][data-zoom=fit]', state: 'visible' } },
  { assert: { selector: '[data-part=tile-bitmap][data-zoom=fit]', state: 'visible' } },
  { assert: { selector: '[data-part=tile-output][data-zoom=fit]', state: 'visible' } },
  { assert: { selector: '[data-part=canvas-field]', state: 'visible' } },
  // Absolute picks, never a flip: each segment names a magnification.
  { moveTo: '[data-part=seg-close]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=tile-field][data-zoom=close]', state: 'visible' } },
  { assert: { selector: '[data-part=tile-bitmap][data-zoom=close]', state: 'visible' } },
  { assert: { selector: '[data-part=tile-output][data-zoom=close]', state: 'visible' } },
  { assert: { selector: '[data-part=canvas-output]', state: 'visible' } },
  { moveTo: '[data-part=readout]' },
  { wait: 700 },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  // Ends where the specimen mounts, with the whole texture in view.
  { moveTo: '[data-part=seg-fit]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=tile-field][data-zoom=fit]', state: 'visible' } },
  { assert: { selector: '[data-part=canvas-bitmap]', state: 'visible' } },
  { wait: 700 },
]);
