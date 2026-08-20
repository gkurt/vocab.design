import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the resting claims wait for the popover to land.
  { wait: 700 },
  { assert: { selector: '[data-part=popover][data-open]', state: 'visible' } },
  { assert: { selector: '[data-part=list]', state: 'visible' } },
  { assert: { selector: '[data-part=row-duplicate]', state: 'visible' } },
  { assert: { selector: '[data-part=panel][data-open]', state: 'hidden' } },
  { wait: 400 },

  // The rows are commands wherever the body sits: one runs, and the readout says so.
  { moveTo: '[data-part=row-duplicate]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=readout][data-ran=duplicate]', state: 'visible' } },
  { wait: 500 },

  // Same body, different host: the picker names an absolute state rather than flipping one.
  { moveTo: '[data-part=seg-panel]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=panel][data-open]', state: 'visible' } },
  { assert: { selector: '[data-part=list]', state: 'visible' } },
  { assert: { selector: '[data-part=row-duplicate]', state: 'visible' } },
  { assert: { selector: '[data-part=popover][data-open]', state: 'hidden' } },
  { wait: 500 },

  // And the rows still run, in the panel, with no popover anywhere near them.
  { moveTo: '[data-part=row-share]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=readout][data-ran=share]', state: 'visible' } },
  { wait: 700 },
]);
