import { steps } from '#src/stage/choreography.ts';

/*
 * A still script (SPEC §8): the whole claim is two settings of the same two rows over
 * the same character ruler, side by side at rest. There is nothing a pointer could
 * operate, and walking the rows in turn would be the identify pin's job.
 */
export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 500 },
  { assert: { selector: '[data-part=mono]', state: 'visible' } },
  { assert: { selector: '[data-part=mono-0]', state: 'visible' } },
  { assert: { selector: '[data-part=mono-1]', state: 'visible' } },
  { wait: 1000 },
  { assert: { selector: '[data-part=prop]', state: 'visible' } },
  { assert: { selector: '[data-part=prop-0]', state: 'visible' } },
  { assert: { selector: '[data-part=prop-1]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 700 },
]);
