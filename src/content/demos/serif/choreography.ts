import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=glyph-serif]', state: 'visible' } },
  { assert: { selector: '[data-part=glyph-sans]', state: 'visible' } },
  { wait: 800 },
  // Nothing here answers a pointer: a letterform is not a control, so the cursor
  // only walks the comparison the way a reader would.
  { moveTo: '[data-part=glyph-sans]' },
  { wait: 1000 },
  { moveTo: '[data-part=glyph-serif]' },
  { wait: 1100 },
  { moveTo: '[data-part=word-serif]' },
  { wait: 900 },
  { assert: { selector: '[data-part=word-serif]', state: 'visible' } },
  { wait: 600 },
]);
