import { steps } from '#src/stage/choreography.ts';

/*
 * A still script (SPEC §8): the same acronym in the same sentence twice, once in full
 * capitals and once in small capitals. Both settings are on stage at rest and neither
 * answers a pointer, so the pass waits and asserts.
 */
export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 500 },
  { assert: { selector: '[data-part=line-caps]', state: 'visible' } },
  { assert: { selector: '[data-part=run-caps]', state: 'visible' } },
  { wait: 1000 },
  { assert: { selector: '[data-part=line-small]', state: 'visible' } },
  { assert: { selector: '[data-part=run-small]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 700 },
]);
