import { steps } from '#src/stage/choreography.ts';

export default steps([
  // At rest the shape is drawn over the page: top sweep, diagonal, bottom sweep.
  { assert: { selector: '[data-part=path]', state: 'visible' } },
  { assert: { selector: '[data-part=stops]', state: 'hidden' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { wait: 1100 },
  { moveTo: '[data-part=seg-stops]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=seg-stops][data-selected]', state: 'visible' } },
  // The other half of the same claim: which four things the sweep actually lands on.
  { assert: { selector: '[data-part=stops]', state: 'visible' } },
  { assert: { selector: '[data-part=path]', state: 'hidden' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-off]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=path]', state: 'hidden' } },
  { assert: { selector: '[data-part=stops]', state: 'hidden' } },
  { assert: { selector: '[data-part=page]', state: 'visible' } },
  { wait: 1100 },
  // Each segment names an overlay, so the way back is an overlay too, not an undo.
  { moveTo: '[data-part=seg-path]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=path]', state: 'visible' } },
  { assert: { selector: '[data-part=stops]', state: 'hidden' } },
  { wait: 800 },
]);
