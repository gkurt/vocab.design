import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=glyph-sans]', state: 'visible' } },
  { assert: { selector: '[data-part=glyph-serif]', state: 'visible' } },
  { wait: 800 },
  // A letterform answers no pointer; the cursor is only walking the comparison.
  { moveTo: '[data-part=glyph-serif]' },
  { wait: 1000 },
  { moveTo: '[data-part=glyph-sans]' },
  { wait: 1100 },
  { moveTo: '[data-part=word-sans]' },
  { wait: 900 },
  { assert: { selector: '[data-part=word-sans]', state: 'visible' } },
  { wait: 600 },
]);
