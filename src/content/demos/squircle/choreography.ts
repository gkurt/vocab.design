import { steps } from '#src/stage/choreography.ts';

/**
 * An outline answers no pointer and the comparison is complete at rest, so the script is
 * waits and asserts only (SPEC §8): the superellipse, the matched radius dashed over it,
 * and the magnified corner where the two curves part company.
 */
export default steps([
  { wait: 400 },
  { assert: { selector: '[data-part=shape]', state: 'visible' } },
  { assert: { selector: '[data-part=arc]', state: 'visible' } },
  { wait: 1200 },
  { assert: { selector: '[data-part=detail]', state: 'visible' } },
  { wait: 1200 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 500 },
]);
