import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=justified][data-hyphens="none"]', state: 'visible' } },
  { assert: { selector: '[data-part=ragged]', state: 'visible' } },
  { wait: 1000 },
  // Absolute states, not a flip: the pass reaches "auto" and then reaches "none"
  // again, so it demonstrates the same thing wherever it is picked up (SPEC §8).
  { moveTo: '[data-part=seg-auto]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=justified][data-hyphens="auto"]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { wait: 1500 },
  { moveTo: '[data-part=seg-none]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=justified][data-hyphens="none"]', state: 'visible' } },
  { wait: 1000 },
]);
