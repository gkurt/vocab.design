import { steps } from '#src/stage/choreography.ts';

/**
 * A weight is not a control: nothing here answers a pointer and nothing changes, so the
 * script is waits and asserts only (SPEC §8). It holds the ramp on stage from its lightest
 * step to its heaviest, then the row underneath where weight alone says which line is the
 * title.
 */
export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=ramp]', state: 'visible' } },
  { assert: { selector: '[data-part=sample-300]', state: 'visible' } },
  { assert: { selector: '[data-part=sample-400]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=sample-600]', state: 'visible' } },
  { assert: { selector: '[data-part=sample-700]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=applied]', state: 'visible' } },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 800 },
]);
