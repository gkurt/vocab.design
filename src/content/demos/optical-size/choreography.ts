import { steps } from '#src/stage/choreography.ts';

/*
 * A still script (SPEC §8): one design in two cuts, both set at the same rendered
 * size, plus the sizes each cut is for underneath. The comparison is the whole claim
 * and it is visible at rest, so the pass waits and asserts.
 */
export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 500 },
  { assert: { selector: '[data-part=pair]', state: 'visible' } },
  { assert: { selector: '[data-part=caption-cut]', state: 'visible' } },
  { assert: { selector: '[data-part=display-cut]', state: 'visible' } },
  { wait: 1100 },
  { assert: { selector: '[data-part=intended]', state: 'visible' } },
  { assert: { selector: '[data-part=caption-cut-native]', state: 'visible' } },
  { assert: { selector: '[data-part=display-cut-native]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 700 },
]);
