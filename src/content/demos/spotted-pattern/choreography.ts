import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claims wait for the scene to settle.
  { wait: 700 },
  { assert: { selector: '[data-part=spray]', state: 'visible' } },
  { assert: { selector: '[data-part=stalled]', state: 'hidden' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-flat]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=seg-flat][data-selected]', state: 'visible' } },
  // Nothing to spot: the hunt stops after the first two lines.
  { assert: { selector: '[data-part=stalled]', state: 'visible' } },
  { assert: { selector: '[data-part=spray]', state: 'hidden' } },
  { wait: 1400 },
  { moveTo: '[data-part=seg-formatted]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=spray]', state: 'visible' } },
  { assert: { selector: '[data-part=stalled]', state: 'hidden' } },
  { wait: 800 },
]);
