import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The face fades in from mount, so the modular claims wait for it to land.
  { wait: 700 },
  { assert: { selector: '[data-part=face][data-family=modular]', state: 'visible' } },
  { assert: { selector: '[data-part=comp][data-size=large]', state: 'visible' } },
  { assert: { selector: '[data-part=comp-value]', state: 'visible' } },
  { wait: 700 },

  // A round slot: the ring and an abbreviated figure survive, the name does not.
  { moveTo: '[data-part=seg-circular]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=face][data-family=circular]', state: 'visible' } },
  { assert: { selector: '[data-part=comp][data-size=medium]', state: 'visible' } },
  { assert: { selector: '[data-part=comp-value]', state: 'visible' } },
  { wait: 900 },

  // A corner grants a ring alone, so the figure drops rather than being truncated.
  { moveTo: '[data-part=seg-corner]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=face][data-family=corner]', state: 'visible' } },
  { assert: { selector: '[data-part=comp][data-size=small]', state: 'visible' } },
  { assert: { selector: '[data-part=comp-value]', state: 'hidden' } },
  { wait: 900 },

  // Back to the wide slot, so a pass picked up anywhere reads the same.
  { moveTo: '[data-part=seg-modular]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=comp][data-size=large]', state: 'visible' } },
  { assert: { selector: '[data-part=comp-value]', state: 'visible' } },
  { wait: 800 },
]);
