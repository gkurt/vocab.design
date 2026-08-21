import { steps } from '#src/stage/choreography.ts';

/**
 * Drawn shapes answer no pointer and nothing here changes state, so the script is waits
 * and asserts only (SPEC §8). It holds the comparison on stage in the order it is made:
 * one character drawn twice, then two characters drawn once.
 */
export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=row-one-character]', state: 'visible' } },
  { assert: { selector: '[data-part=glyph-sans]', state: 'visible' } },
  { assert: { selector: '[data-part=glyph-serif]', state: 'visible' } },
  { wait: 1000 },
  { assert: { selector: '[data-part=row-one-glyph]', state: 'visible' } },
  { assert: { selector: '[data-part=glyph-fused]', state: 'visible' } },
  { assert: { selector: '[data-part=glyph-split]', state: 'visible' } },
  { wait: 1000 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 800 },
]);
