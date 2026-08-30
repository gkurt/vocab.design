import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=column][data-hyphens="auto"]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { wait: 1200 },
  // Absolute states, not a flip: the pass reaches "none" and then reaches "auto"
  // again, so it demonstrates the same thing wherever it is picked up (SPEC §8).
  { moveTo: '[data-part=seg-none]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=column][data-hyphens="none"]', state: 'visible' } },
  { wait: 1600 },
  { moveTo: '[data-part=seg-auto]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=column][data-hyphens="auto"]', state: 'visible' } },
  { wait: 1200 },
]);
