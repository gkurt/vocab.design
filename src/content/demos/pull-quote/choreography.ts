import { steps } from '#src/stage/choreography.ts';

/*
 * A still script (SPEC §8): the pairing is the claim, one sentence in the running text
 * and the same sentence lifted out as display type. Both are on stage at rest and
 * neither answers a pointer, so the pass waits and asserts.
 */
export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 500 },
  { assert: { selector: '[data-part=pull]', state: 'visible' } },
  { assert: { selector: '[data-part=mark]', state: 'visible' } },
  { wait: 1000 },
  { assert: { selector: '[data-part=before]', state: 'visible' } },
  { assert: { selector: '[data-part=running]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=after]', state: 'visible' } },
  { assert: { selector: '[data-part=kicker]', state: 'visible' } },
  { wait: 700 },
]);
