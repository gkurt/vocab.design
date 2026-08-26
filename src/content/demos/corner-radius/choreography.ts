import { steps } from '#src/stage/choreography.ts';

/**
 * A radius answers no pointer and the row is complete at rest, so the script is waits and
 * asserts only (SPEC §8): the four plates, the arc drawn on one of them, and the anatomy
 * that says what the number measures.
 */
export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=plate-0]', state: 'visible' } },
  { assert: { selector: '[data-part=plate-8]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=plate-24]', state: 'visible' } },
  { assert: { selector: '[data-part=plate-36]', state: 'visible' } },
  { assert: { selector: '[data-part=arc]', state: 'visible' } },
  { wait: 1100 },
  { assert: { selector: '[data-part=anatomy]', state: 'visible' } },
  { assert: { selector: '[data-part=anatomy-note]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 500 },
]);
