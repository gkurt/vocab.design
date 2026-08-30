import { steps } from '#src/stage/choreography.ts';

/**
 * A drawing answers no pointer and an illustration has no states to watch, so the script is
 * waits and asserts only (SPEC §8). It holds the lattice and the blocks it produced on
 * stage: the block at the back and the block at the front, drawn at exactly the same size,
 * and the one stacked on the base.
 */
export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=scene]', state: 'visible' } },
  { assert: { selector: '[data-part=grid]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=block-back]', state: 'visible' } },
  { assert: { selector: '[data-part=block-front]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=block-base]', state: 'visible' } },
  { assert: { selector: '[data-part=block-stacked]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=legend]', state: 'visible' } },
  { wait: 700 },
]);
