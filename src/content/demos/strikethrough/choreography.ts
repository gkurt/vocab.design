import { steps } from '#src/stage/choreography.ts';

/**
 * A static comparison answers no pointer, and all three jobs the mark does are drawn at
 * rest, so the script is waits and asserts only (SPEC §8): the superseded price, the
 * finished task, and the tracked deletion.
 */
export default steps([
  { wait: 400 },
  { assert: { selector: '[data-part=old-price]', state: 'visible' } },
  { assert: { selector: '[data-part=new-price]', state: 'visible' } },
  { wait: 1200 },
  { assert: { selector: '[data-part=task]', state: 'visible' } },
  { wait: 1200 },
  { assert: { selector: '[data-part=tracked]', state: 'visible' } },
  { wait: 800 },
]);
