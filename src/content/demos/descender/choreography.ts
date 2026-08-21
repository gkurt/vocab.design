import { steps } from '#src/stage/choreography.ts';

// A measurement answers no pointer. The band under the baseline, the key, and the
// pair of boxes that do and do not leave room are all drawn at mount (SPEC §8).
export default steps([
  { wait: 450 },
  { assert: { selector: '[data-part=ruled]', state: 'visible' } },
  { assert: { selector: '[data-part=specimen]', state: 'visible' } },
  { assert: { selector: '[data-part=band]', state: 'visible' } },
  { wait: 1200 },
  { assert: { selector: '[data-part=legend]', state: 'visible' } },
  { wait: 1000 },
  { assert: { selector: '[data-part=trimmed]', state: 'visible' } },
  { assert: { selector: '[data-part=roomy]', state: 'visible' } },
  { wait: 1200 },
]);
