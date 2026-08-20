import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The panel fades in from mount, so the resting claims wait for it to land.
  { wait: 700 },
  { assert: { selector: '[data-part=card-standard][aria-checked="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=card-pro][aria-checked="false"]', state: 'visible' } },
  { assert: { selector: '[data-part=fill-standard]', state: 'visible' } },
  { assert: { selector: '[data-part=fill-pro]', state: 'hidden' } },
  { assert: { selector: '[data-part=readout][data-plan=standard]', state: 'visible' } },
  { wait: 600 },

  // The press lands in the middle of the tile, nowhere near the dot: the whole rectangle
  // is the control, which is the claim the term makes.
  { moveTo: '[data-part=card-pro]' },
  { click: true },
  { wait: 550 },
  { assert: { selector: '[data-part=card-pro][aria-checked="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=card-standard][aria-checked="false"]', state: 'visible' } },
  { assert: { selector: '[data-part=fill-pro]', state: 'visible' } },
  { assert: { selector: '[data-part=fill-standard]', state: 'hidden' } },
  { assert: { selector: '[data-part=readout][data-plan=pro]', state: 'visible' } },
  { wait: 900 },

  // Radios, not checkboxes: picking a third tile takes the choice with it rather than
  // adding to it.
  { moveTo: '[data-part=card-basic]' },
  { click: true },
  { wait: 550 },
  { assert: { selector: '[data-part=card-basic][aria-checked="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=fill-pro]', state: 'hidden' } },
  { assert: { selector: '[data-part=readout][data-plan=basic]', state: 'visible' } },
  { wait: 900 },

  // Back to the plan the panel rests on.
  { moveTo: '[data-part=card-standard]' },
  { click: true },
  { wait: 550 },
  { assert: { selector: '[data-part=card-standard][aria-checked="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=card-basic][aria-checked="false"]', state: 'visible' } },
  { wait: 800 },
]);
