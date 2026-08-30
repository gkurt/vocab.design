import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=column][data-glue="nbsp"]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { wait: 1200 },
  // Absolute states, not a flip: the pass reaches "space" and then reaches
  // "nbsp" again, so it reads the same wherever it is picked up (SPEC §8).
  { moveTo: '[data-part=seg-space]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=column][data-glue="space"]', state: 'visible' } },
  { wait: 1600 },
  { moveTo: '[data-part=seg-nbsp]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=column][data-glue="nbsp"]', state: 'visible' } },
  { wait: 1200 },
]);
