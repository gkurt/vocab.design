import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=headline][data-wrap="balance"]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { wait: 1200 },
  // Absolute states, not a flip: the pass reaches "wrap" and then reaches
  // "balance" again, so it reads the same wherever it is picked up (SPEC §8).
  { moveTo: '[data-part=seg-wrap]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=headline][data-wrap="wrap"]', state: 'visible' } },
  { wait: 1600 },
  { moveTo: '[data-part=seg-balance]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=headline][data-wrap="balance"]', state: 'visible' } },
  { assert: { selector: '[data-part=body]', state: 'visible' } },
  { wait: 1200 },
]);
