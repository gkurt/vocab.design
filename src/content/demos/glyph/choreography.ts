import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=glyph-sans]', state: 'visible' } },
  { assert: { selector: '[data-part=glyph-serif]', state: 'visible' } },
  { assert: { selector: '[data-part=glyph-fused]', state: 'visible' } },
  { wait: 800 },
  // Drawn shapes answer no pointer, so the cursor reads the comparison in the
  // order it is made: one character twice, then two characters once.
  { moveTo: '[data-part=glyph-sans]' },
  { wait: 900 },
  { moveTo: '[data-part=glyph-serif]' },
  { wait: 1000 },
  { assert: { selector: '[data-part=row-one-character]', state: 'visible' } },
  { moveTo: '[data-part=glyph-fused]' },
  { wait: 1000 },
  { moveTo: '[data-part=glyph-split]' },
  { wait: 900 },
  { assert: { selector: '[data-part=row-one-glyph]', state: 'visible' } },
  { moveTo: '[data-part=caption]' },
  { wait: 800 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
]);
