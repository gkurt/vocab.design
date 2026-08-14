import { steps } from '#src/stage/choreography.ts';

export default steps([
  // At rest the four areas are named over the page.
  { assert: { selector: '[data-part=quadrants]', state: 'visible' } },
  { assert: { selector: '[data-part=gravity]', state: 'hidden' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-gravity]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=seg-gravity][aria-selected="true"]', state: 'visible' } },
  // The other half of the same claim: the pull that runs between the first area and
  // the last one.
  { assert: { selector: '[data-part=gravity]', state: 'visible' } },
  { assert: { selector: '[data-part=quadrants]', state: 'hidden' } },
  { wait: 1400 },
  { moveTo: '[data-part=seg-off]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=quadrants]', state: 'hidden' } },
  { assert: { selector: '[data-part=gravity]', state: 'hidden' } },
  { assert: { selector: '[data-part=page]', state: 'visible' } },
  { wait: 1200 },
  // Each segment names an overlay, so the way back is an overlay too, not an undo.
  { moveTo: '[data-part=seg-quadrants]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=quadrants]', state: 'visible' } },
  { assert: { selector: '[data-part=gravity]', state: 'hidden' } },
  { wait: 900 },
]);
