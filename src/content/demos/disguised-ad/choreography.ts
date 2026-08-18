import { steps } from '#src/stage/choreography.ts';

// One card, three disclosures, and the two stories around it never change. The pass proves
// that the fine print state is still the term (the card keeps its disguise flag) and that
// only the labelled state drops it. It returns to the state the specimen mounts in (SPEC §8).
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=ad][data-disguise=on]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-mode=none]', state: 'visible' } },
  { assert: { selector: '[data-part=badge]', state: 'hidden' } },
  { wait: 800 },

  { moveTo: '[data-part=mode-fine]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=ad][data-mode=fine]', state: 'visible' } },
  { assert: { selector: '[data-part=ad][data-disguise=on]', state: 'visible' } },
  { assert: { selector: '[data-part=badge]', state: 'hidden' } },
  { wait: 1500 },

  { moveTo: '[data-part=mode-labelled]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=ad][data-disguise=off]', state: 'visible' } },
  { assert: { selector: '[data-part=badge]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-mode=labelled]', state: 'visible' } },
  { wait: 1500 },

  { moveTo: '[data-part=mode-none]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=ad][data-disguise=on]', state: 'visible' } },
  { assert: { selector: '[data-part=badge]', state: 'hidden' } },
  { wait: 700 },
]);
