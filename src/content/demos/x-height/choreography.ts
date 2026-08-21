import { steps } from '#src/stage/choreography.ts';

/**
 * A measurement answers no pointer, and the ruling is drawn from each face's own metric at
 * mount, so the script is waits and asserts only (SPEC §8): the ruled pair, and the two
 * columns whose lowercase spends a different share of the same size.
 */
export default steps([
  { wait: 400 },
  { assert: { selector: '[data-part=ruled]', state: 'visible' } },
  { assert: { selector: '[data-part=sample-large]', state: 'visible' } },
  { wait: 1100 },
  { assert: { selector: '[data-part=sample-small]', state: 'visible' } },
  { wait: 1100 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 700 },
]);
