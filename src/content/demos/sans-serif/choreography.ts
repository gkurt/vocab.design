import { steps } from '#src/stage/choreography.ts';

/*
 * A still script (SPEC §8): one letter drawn twice, plus the same word in each face.
 * A letterform is not a control, and walking the comparison with a cursor would
 * demonstrate nothing the identify pin does not name better.
 */
export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 500 },
  { assert: { selector: '[data-part=glyph-sans]', state: 'visible' } },
  { assert: { selector: '[data-part=glyph-serif]', state: 'visible' } },
  { wait: 1000 },
  { assert: { selector: '[data-part=word-sans]', state: 'visible' } },
  { assert: { selector: '[data-part=word-serif]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 700 },
]);
