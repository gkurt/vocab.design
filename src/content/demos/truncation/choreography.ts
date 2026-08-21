import { steps } from '#src/stage/choreography.ts';

/**
 * A cut line is not a control: none of the three fates answers a pointer and all three are
 * drawn at rest, so the script is waits and asserts only (SPEC §8). The single-line cut is
 * the term, and the clamp and the full wrap are what it is read against.
 */
export default steps([
  { wait: 400 },
  { assert: { selector: '[data-part=single]', state: 'visible' } },
  { wait: 1100 },
  { assert: { selector: '[data-part=clamp]', state: 'visible' } },
  { wait: 1100 },
  { assert: { selector: '[data-part=full]', state: 'visible' } },
  { wait: 700 },
]);
