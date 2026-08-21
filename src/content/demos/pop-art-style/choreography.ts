import { steps } from '#src/stage/choreography.ts';

/*
 * A still script (SPEC §8): a printed panel with its repeats, burst, balloon, and
 * tail all on stage at rest. Nothing here answers a pointer, so the pass waits and
 * asserts rather than touring the parts with a cursor.
 */
export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 500 },
  { assert: { selector: '[data-part=card]', state: 'visible' } },
  { assert: { selector: '[data-part=repeats]', state: 'visible' } },
  { assert: { selector: '[data-part=burst]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=balloon]', state: 'visible' } },
  { assert: { selector: '[data-part=tail]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 700 },
]);
