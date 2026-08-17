import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 400 },
  // Mount is ratio 1: the subject plate and its 1x reference are the same raster.
  { assert: { selector: '[data-part=plate][data-dpr="1"]', state: 'visible' } },
  { assert: { selector: '[data-part=reference]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { wait: 1100 },
  { moveTo: '[data-part=seg-2x]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=seg-2x][aria-selected="true"]', state: 'visible' } },
  // Twice the samples in the same box: the reference is still there to be read against.
  { assert: { selector: '[data-part=plate][data-dpr="2"]', state: 'visible' } },
  { assert: { selector: '[data-part=reference]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=seg-3x]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=seg-3x][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=plate][data-dpr="3"]', state: 'visible' } },
  { wait: 1400 },
  // Each segment names a ratio, so the way back is a ratio too, not an undo.
  { moveTo: '[data-part=seg-1x]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=plate][data-dpr="1"]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { wait: 900 },
]);
