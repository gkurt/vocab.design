import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the resting claims wait for the panel to land.
  { wait: 700 },
  { assert: { selector: '[data-part=tile][data-state=off]', state: 'visible' } },
  { assert: { selector: '[data-part=symbol]', state: 'visible' } },
  { assert: { selector: '[data-part=value]', state: 'visible' } },
  { assert: { selector: '[data-part=sys-alerts]', state: 'visible' } },
  { wait: 500 },

  // One tap from the shell's own panel switches the feature, and the value says what it did.
  { moveTo: '[data-part=tile]' },
  { click: true },
  { wait: 550 },
  { assert: { selector: '[data-part=tile][data-state=on]', state: 'visible' } },
  { assert: { selector: '[data-part=value]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { wait: 1000 },

  // And back: the flip is the term here, so the script drives both directions itself.
  { click: true },
  { wait: 550 },
  { assert: { selector: '[data-part=tile][data-state=off]', state: 'visible' } },
  { assert: { selector: '[data-part=sys-agenda][data-state=on]', state: 'visible' } },
  { wait: 800 },
]);
