import { steps } from '#src/stage/choreography.ts';

/*
 * A still script (SPEC §8): a poster of props that date the drawing, all of them on
 * stage at rest. Nothing answers a pointer, and pointing at the rocket, the planet,
 * and the atom in turn is the identify pin's job rather than the cursor's.
 */
export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 500 },
  { assert: { selector: '[data-part=poster]', state: 'visible' } },
  { assert: { selector: '[data-part=rocket]', state: 'visible' } },
  { assert: { selector: '[data-part=planet]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=atom]', state: 'visible' } },
  { assert: { selector: '[data-part=title]', state: 'visible' } },
  { assert: { selector: '[data-part=foot]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 700 },
]);
