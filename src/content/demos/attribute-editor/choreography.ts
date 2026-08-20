import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the resting claims wait for the card to land.
  { wait: 700 },
  { assert: { selector: '[data-part=row-accept]', state: 'visible' } },
  { assert: { selector: '[data-part=row-trace]', state: 'visible' } },
  { assert: { selector: '[data-part=row-cache]', state: 'visible' } },
  { assert: { selector: '[data-part=add]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-focus=none]', state: 'visible' } },
  { wait: 300 },

  // A fourth row, added into room the section already held. Focus goes into it.
  { moveTo: '[data-part=add]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=row-new1]', state: 'visible' } },
  { assert: { selector: '[data-part=key-new1][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-focus="key-new1"]', state: 'visible' } },

  // The pair is typed in, key then value.
  { moveTo: '[data-part=key-new1]' },
  { click: true },
  { type: 'X-Request-Id' },
  { wait: 300 },
  { moveTo: '[data-part=value-new1]' },
  { click: true },
  { type: 'a91f0c' },
  { wait: 500 },
  { assert: { selector: '[data-part=row-new1][data-filled=true]', state: 'visible' } },
  { wait: 400 },

  // Focus moves into the middle row, the one about to be destroyed.
  { moveTo: '[data-part=key-trace]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=readout][data-focus="key-trace"]', state: 'visible' } },
  { wait: 400 },

  // Remove it. The row is gone and focus is on the row that took its place, not on nothing.
  { moveTo: '[data-part=remove-trace]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=row-trace]', state: 'hidden' } },
  { assert: { selector: '[data-part=key-cache][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-focus="key-cache"]', state: 'visible' } },
  { wait: 800 },
]);
