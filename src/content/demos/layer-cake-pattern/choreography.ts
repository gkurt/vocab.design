import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claims wait for the scene to settle.
  { wait: 700 },
  { assert: { selector: '[data-part=bands]', state: 'visible' } },
  { assert: { selector: '[data-part=fshape]', state: 'hidden' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-flat]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=seg-flat][aria-selected="true"]', state: 'visible' } },
  // With nothing to sample, the layers are gone and the scan falls back to an F.
  { assert: { selector: '[data-part=fshape]', state: 'visible' } },
  { assert: { selector: '[data-part=bands]', state: 'hidden' } },
  { wait: 1400 },
  { moveTo: '[data-part=seg-subheads]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=bands]', state: 'visible' } },
  { assert: { selector: '[data-part=fshape]', state: 'hidden' } },
  { wait: 800 },
]);
