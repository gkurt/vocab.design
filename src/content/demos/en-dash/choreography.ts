import { steps } from '#src/stage/choreography.ts';

/**
 * Three usage lines and a width row, none of which answers a pointer, so the script is
 * waits and asserts only (SPEC §8): it holds each job the mark does on stage in turn, then
 * the family it is told apart from.
 */
export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=jobs]', state: 'visible' } },
  { assert: { selector: '[data-part=job-range]', state: 'visible' } },
  { wait: 800 },
  { assert: { selector: '[data-part=job-score]', state: 'visible' } },
  { assert: { selector: '[data-part=job-link]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=mark-hyphen]', state: 'visible' } },
  { assert: { selector: '[data-part=mark-en]', state: 'visible' } },
  { assert: { selector: '[data-part=mark-em]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 700 },
]);
