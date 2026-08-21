import { steps } from '#src/stage/choreography.ts';

/**
 * A letterform answers no pointer and nothing here changes, so the script is waits and
 * asserts only (SPEC §8). It holds the three settings on stage in the order a reader
 * compares them: upright, the drawn italic, and the skewed upright beside it.
 */
export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=sample-roman]', state: 'visible' } },
  { wait: 800 },
  { assert: { selector: '[data-part=sample-italic]', state: 'visible' } },
  { wait: 1000 },
  { assert: { selector: '[data-part=sample-oblique]', state: 'visible' } },
  { wait: 1000 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 800 },
]);
