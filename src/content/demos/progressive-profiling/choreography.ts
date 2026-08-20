import { steps } from '#src/stage/choreography.ts';

// Three visits in order, then the form the pattern exists to avoid, then back to a visit,
// which is the state that has a single question in it (SPEC §6, §8).
export default steps([
  { wait: 600 },
  { assert: { selector: '[data-part=ask][data-visit="1"]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-pct="20"]', state: 'visible' } },
  { assert: { selector: '[data-part=form]', state: 'hidden' } },
  { wait: 800 },

  { moveTo: '[data-part=view-v4]' },
  { click: true },
  { wait: 650 },
  { assert: { selector: '[data-part=ask][data-visit="4"]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-pct="55"]', state: 'visible' } },
  { wait: 1300 },

  { moveTo: '[data-part=view-v9]' },
  { click: true },
  { wait: 650 },
  { assert: { selector: '[data-part=ask][data-visit="9"]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-pct="85"]', state: 'visible' } },
  { wait: 1300 },

  { moveTo: '[data-part=view-form]' },
  { click: true },
  { wait: 650 },
  { assert: { selector: '[data-part=form]', state: 'visible' } },
  { assert: { selector: '[data-part=ask]', state: 'hidden' } },
  { wait: 1500 },

  { moveTo: '[data-part=view-v1]' },
  { click: true },
  { wait: 650 },
  { assert: { selector: '[data-part=ask][data-visit="1"]', state: 'visible' } },
  { assert: { selector: '[data-part=form]', state: 'hidden' } },
  { wait: 1000 },
]);
