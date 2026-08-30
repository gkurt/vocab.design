import { steps } from '#src/stage/choreography.ts';

export default steps([
  // At rest the shape is drawn over the page: two sweeps and the run down the left.
  { assert: { selector: '[data-part=path]', state: 'visible' } },
  { assert: { selector: '[data-part=cold]', state: 'hidden' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { wait: 1100 },
  { moveTo: '[data-part=seg-cold]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=seg-cold][data-selected]', state: 'visible' } },
  // The other half of the same claim: where the scan never goes.
  { assert: { selector: '[data-part=cold]', state: 'visible' } },
  { assert: { selector: '[data-part=path]', state: 'hidden' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-off]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=path]', state: 'hidden' } },
  { assert: { selector: '[data-part=cold]', state: 'hidden' } },
  { assert: { selector: '[data-part=page]', state: 'visible' } },
  { wait: 1100 },
  // Each segment names an overlay, so the way back is an overlay too, not an undo.
  { moveTo: '[data-part=seg-path]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=path]', state: 'visible' } },
  { assert: { selector: '[data-part=cold]', state: 'hidden' } },
  { wait: 800 },
]);
