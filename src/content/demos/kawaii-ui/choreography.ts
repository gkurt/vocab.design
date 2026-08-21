import { steps } from '#src/stage/choreography.ts';

/**
 * A poster answers no pointer and has no states, so the script is waits and asserts only
 * (SPEC §8): it holds the empty state on stage with the four moves that make it read cute,
 * the face, the chunky button, and the legend that names them. The opening wait lets the
 * mount fade finish first.
 */
export default steps([
  { wait: 450 },
  { assert: { selector: '[data-part=empty]', state: 'visible' } },
  { assert: { selector: '[data-part=mascot]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=empty-title]', state: 'visible' } },
  { assert: { selector: '[data-part=empty-button]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=legend]', state: 'visible' } },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 800 },
]);
