import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=glyph-copy]', state: 'visible' } },
  { assert: { selector: '[data-part=glyph-done]', state: 'hidden' } },
  { moveTo: '[data-part=copy]' },
  { click: true },
  { wait: 320 },
  { assert: { selector: '[data-part=copy][data-copied]', state: 'visible' } },
  { assert: { selector: '[data-part=glyph-done]', state: 'visible' } },
  { assert: { selector: '[data-part=glyph-copy]', state: 'hidden' } },
  // Well past the confirming beat, not at the edge of it: the point is that the
  // control puts itself back rather than staying ticked.
  { wait: 1900 },
  { assert: { selector: '[data-part=glyph-done]', state: 'hidden' } },
  { assert: { selector: '[data-part=glyph-copy]', state: 'visible' } },
  { wait: 700 },
]);
