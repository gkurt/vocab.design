import { steps } from '#src/stage/choreography.ts';

/**
 * A poster answers no pointer, so the script is a tour: the cursor visits the face, the
 * chunky button, and the legend that names the moves, while the asserts hold the empty
 * state and its parts on stage. The opening wait lets the mount fade finish first.
 */
export default steps([
  { wait: 450 },
  { assert: { selector: '[data-part=empty]', state: 'visible' } },
  { assert: { selector: '[data-part=mascot]', state: 'visible' } },
  { wait: 600 },
  { moveTo: '[data-part=mascot]' },
  { wait: 850 },
  { moveTo: '[data-part=empty-button]' },
  { wait: 850 },
  { assert: { selector: '[data-part=empty-button]', state: 'visible' } },
  { moveTo: '[data-part=legend]' },
  { wait: 850 },
  { assert: { selector: '[data-part=legend]', state: 'visible' } },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 600 },
]);
