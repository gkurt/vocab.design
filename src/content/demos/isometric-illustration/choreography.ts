import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=scene]', state: 'visible' } },
  { assert: { selector: '[data-part=grid]', state: 'visible' } },
  { wait: 700 },
  // A drawing answers no pointer: the cursor compares the block at the back with the one at
  // the front, both drawn at the same size, then the one stacked on top of the first.
  { moveTo: '[data-part=block-back]' },
  { wait: 800 },
  { moveTo: '[data-part=block-front]' },
  { wait: 800 },
  { moveTo: '[data-part=block-stacked]' },
  { wait: 800 },
  { assert: { selector: '[data-part=block-base]', state: 'visible' } },
  { assert: { selector: '[data-part=legend]', state: 'visible' } },
  { wait: 600 },
]);
