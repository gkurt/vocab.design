import { steps } from '#src/stage/choreography.ts';

/**
 * A poured floor answers no pointer, so the script is a tour: the cursor crosses the ground,
 * the marked window, and the magnifier that blows it up, while the asserts hold the surface
 * and both readings of it on stage. The opening wait lets the mount fade finish first.
 */
export default steps([
  { wait: 450 },
  { assert: { selector: '[data-part=ground]', state: 'visible' } },
  { assert: { selector: '[data-part=field]', state: 'visible' } },
  { wait: 600 },
  { moveTo: '[data-part=card]' },
  { wait: 800 },
  { moveTo: '[data-part=region]' },
  { wait: 850 },
  { assert: { selector: '[data-part=region]', state: 'visible' } },
  { moveTo: '[data-part=zoom]' },
  { wait: 850 },
  { assert: { selector: '[data-part=zoom]', state: 'visible' } },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 600 },
]);
