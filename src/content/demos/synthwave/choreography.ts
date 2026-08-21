import { steps } from '#src/stage/choreography.ts';

/**
 * A poster answers no pointer and the palette is the term, complete at rest, so the script
 * is waits and asserts only (SPEC §8): the star field, the slatted sun on the horizon, the
 * mountains cut out of the sky, the grid running to one vanishing point, and the chrome
 * capitals over it.
 */
export default steps([
  { wait: 400 },
  { assert: { selector: '[data-part=poster]', state: 'visible' } },
  { assert: { selector: '[data-part=stars]', state: 'visible' } },
  { assert: { selector: '[data-part=sun]', state: 'visible' } },
  { wait: 1100 },
  { assert: { selector: '[data-part=mountains]', state: 'visible' } },
  { assert: { selector: '[data-part=grid]', state: 'visible' } },
  { wait: 1100 },
  { assert: { selector: '[data-part=title]', state: 'visible' } },
  { assert: { selector: '[data-part=strip]', state: 'visible' } },
  { wait: 700 },
]);
