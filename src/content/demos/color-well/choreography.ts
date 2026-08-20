import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the resting claims wait for the toolbar to land.
  { wait: 700 },
  { assert: { selector: '[data-part=well][data-color=indigo]', state: 'visible' } },
  { assert: { selector: '[data-part=shape][data-color=indigo]', state: 'visible' } },
  { assert: { selector: '[data-part=panel]', state: 'hidden' } },
  { wait: 500 },

  // Pressing the well summons the picker. The well itself carries the open state, so the
  // claim survives the panel closing later.
  { moveTo: '[data-part=well]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=panel]', state: 'visible' } },
  { assert: { selector: '[data-part=well][data-open]', state: 'visible' } },
  { wait: 700 },

  // Choosing a swatch closes the picker and repaints both the well and the shape it sets.
  { moveTo: '[data-part=sw-amber]' },
  { click: true },
  { wait: 550 },
  { assert: { selector: '[data-part=panel]', state: 'hidden' } },
  { assert: { selector: '[data-part=well][data-color=amber]', state: 'visible' } },
  { assert: { selector: '[data-part=shape][data-color=amber]', state: 'visible' } },
  { assert: { selector: '[data-part=well][data-open]', state: 'hidden' } },
  { wait: 900 },

  // The well is a trigger, not a one-shot: it opens the same picker on the current value.
  { moveTo: '[data-part=well]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=panel]', state: 'visible' } },
  { wait: 600 },
  { moveTo: '[data-part=sw-teal]' },
  { click: true },
  { wait: 550 },
  { assert: { selector: '[data-part=well][data-color=teal]', state: 'visible' } },
  { assert: { selector: '[data-part=shape][data-color=teal]', state: 'visible' } },
  { assert: { selector: '[data-part=panel]', state: 'hidden' } },
  { wait: 800 },
]);
