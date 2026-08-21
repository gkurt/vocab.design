import { steps } from '#src/stage/choreography.ts';

/*
 * A still script (SPEC §8): two inks printed one pass out of register, which is a
 * finished sheet rather than a behaviour. Every claim is visible at rest, so the pass
 * waits and asserts rather than touring the overprint with a cursor.
 */
export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 500 },
  { assert: { selector: '[data-part=card]', state: 'visible' } },
  { assert: { selector: '[data-part=ink-teal]', state: 'visible' } },
  { assert: { selector: '[data-part=ink-pink]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=bars]', state: 'visible' } },
  { assert: { selector: '[data-part=bars-offset]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=headline-teal]', state: 'visible' } },
  { assert: { selector: '[data-part=headline-pink]', state: 'visible' } },
  { assert: { selector: '[data-part=grain]', state: 'visible' } },
  { assert: { selector: '[data-part=regmark]', state: 'visible' } },
  { wait: 700 },
]);
