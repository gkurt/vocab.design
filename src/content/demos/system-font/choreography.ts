import { steps } from '#src/stage/choreography.ts';

/**
 * The keyword is resolved by the machine, not by the reader: nothing here answers a
 * pointer and the whole claim is drawn at rest, so the script is waits and asserts only
 * (SPEC §8). The line is the face the platform chose, the readout names what the
 * measurement found, and the table says what the keyword means elsewhere.
 */
export default steps([
  { wait: 400 },
  { assert: { selector: '[data-part=specimen]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { wait: 1200 },
  { assert: { selector: '[data-part=platforms]', state: 'visible' } },
  { assert: { selector: '[data-part=row-android]', state: 'visible' } },
  { wait: 1000 },
]);
