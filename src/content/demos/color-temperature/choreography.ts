import { steps } from '#src/stage/choreography.ts';

// Three absolute presets, so every step states a temperature rather than flipping one
// (SPEC §8). Neutral sits between the two biases on purpose: zero chroma at the same
// lightness is what proves the bias was the only thing doing any work.
export default steps([
  { assert: { selector: '[data-part=panel][data-temp="warm"]', state: 'visible' } },
  { assert: { selector: '[data-part=seg-warm][data-selected]', state: 'visible' } },
  { moveTo: '[data-part=seg-cool]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=panel][data-temp="cool"]', state: 'visible' } },
  { assert: { selector: '[data-part=seg-cool][data-selected]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-neutral]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=panel][data-temp="neutral"]', state: 'visible' } },
  { assert: { selector: '[data-part=seg-neutral][data-selected]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-warm]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=panel][data-temp="warm"]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { wait: 1200 },
]);
