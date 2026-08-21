import { steps } from '#src/stage/choreography.ts';

/**
 * A design answers no pointer, and the comparison the specimen is making is complete at
 * rest, so the script is waits and asserts only (SPEC §8): the block that carries the one
 * typeface, and the five fonts drawn from it.
 */
export default steps([
  { wait: 400 },
  { assert: { selector: '[data-part=specimen]', state: 'visible' } },
  { assert: { selector: '[data-part=font-display]', state: 'visible' } },
  { wait: 1100 },
  { assert: { selector: '[data-part=font-italic]', state: 'visible' } },
  { assert: { selector: '[data-part=font-bold]', state: 'visible' } },
  { assert: { selector: '[data-part=font-small]', state: 'visible' } },
  { wait: 1100 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 700 },
]);
