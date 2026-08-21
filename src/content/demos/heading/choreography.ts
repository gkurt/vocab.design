import { steps } from '#src/stage/choreography.ts';

/**
 * A heading answers no pointer and this outline has no second state, so the script is waits
 * and asserts only (SPEC §8). It holds the three levels on stage top down, each with the
 * copy it names reduced to texture, which is the comparison the scale is read against.
 */
export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=h1]', state: 'visible' } },
  { assert: { selector: '[data-part=copy-h1]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=h2]', state: 'visible' } },
  { assert: { selector: '[data-part=copy-h2]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=h3]', state: 'visible' } },
  { assert: { selector: '[data-part=copy-h3]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 700 },
]);
