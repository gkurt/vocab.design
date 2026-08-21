import { steps } from '#src/stage/choreography.ts';

/*
 * A still script (SPEC §8): the whole claim is two settings of one pair, side by
 * side at rest, so the pass is waits and asserts. There is nothing here a pointer
 * could operate, and pointing at the letters in turn would be the identify pin's
 * job rather than the cursor's.
 */
export default steps([
  // Kit surfaces fade in from mount, and the band is drawn again once the face lands.
  { wait: 700 },
  { assert: { selector: '[data-part=pair-none]', state: 'visible' } },
  { assert: { selector: '[data-part=pair-normal]', state: 'visible' } },
  { assert: { selector: '[data-part=kern-band]', state: 'visible' } },
  { wait: 1100 },
  { assert: { selector: '[data-part=measured]', state: 'visible' } },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 1400 },
  { assert: { selector: '[data-part=kern-band]', state: 'visible' } },
]);
