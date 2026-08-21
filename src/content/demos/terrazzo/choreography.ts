import { steps } from '#src/stage/choreography.ts';

/**
 * A poured floor answers no pointer and the surface is the term, complete at rest, so the
 * script is waits and asserts only (SPEC §8): the ground, the chips scattered across it,
 * the marked window, and the magnifier that blows that window up. The opening wait lets
 * the mount fade finish first.
 */
export default steps([
  { wait: 450 },
  { assert: { selector: '[data-part=ground]', state: 'visible' } },
  { assert: { selector: '[data-part=field]', state: 'visible' } },
  { wait: 1100 },
  { assert: { selector: '[data-part=card]', state: 'visible' } },
  { assert: { selector: '[data-part=region]', state: 'visible' } },
  { wait: 1100 },
  { assert: { selector: '[data-part=zoom]', state: 'visible' } },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 600 },
]);
