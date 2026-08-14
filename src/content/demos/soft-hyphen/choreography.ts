import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=shy][data-width="narrow"]', state: 'visible' } },
  { assert: { selector: '[data-part=hard]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { wait: 1200 },
  // Absolute states, not a flip: the pass reaches "wide" and then reaches
  // "narrow" again, so it demonstrates the same thing wherever it is picked up.
  { moveTo: '[data-part=seg-wide]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=shy][data-width="wide"]', state: 'visible' } },
  { moveTo: '[data-part=shy]' },
  { wait: 1400 },
  { moveTo: '[data-part=seg-narrow]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=shy][data-width="narrow"]', state: 'visible' } },
  { wait: 1200 },
]);
