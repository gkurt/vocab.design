import { steps } from '#src/stage/choreography.ts';

/**
 * A ruled comparison answers no pointer and has no second state, so the script is waits
 * and asserts only (SPEC §8). It holds the family on stage a row at a time, then the
 * reference letters the two longer marks are named after, then the two house styles that
 * do the em dash's job.
 */
export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=row-hyphen]', state: 'visible' } },
  { assert: { selector: '[data-part=glyph-hyphen]', state: 'visible' } },
  { wait: 800 },
  { assert: { selector: '[data-part=row-en-dash]', state: 'visible' } },
  { assert: { selector: '[data-part=glyph-en-dash]', state: 'visible' } },
  { wait: 800 },
  { assert: { selector: '[data-part=row-em-dash]', state: 'visible' } },
  { assert: { selector: '[data-part=glyph-em-dash]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=reference]', state: 'visible' } },
  { wait: 800 },
  { assert: { selector: '[data-part=house]', state: 'visible' } },
  { wait: 800 },
]);
