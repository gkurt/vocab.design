import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=glyph]', state: 'visible' } },
  { assert: { selector: '[data-part=glyph][data-open]', state: 'hidden' } },
  { moveTo: '[data-part=trigger]' },
  { wait: 300 },
  { click: true },
  // Past the 260 ms the bars take to cross, so the claim is about the glyph's second
  // reading rather than about a frame in the middle of the move.
  { wait: 500 },
  { assert: { selector: '[data-part=glyph][data-open]', state: 'visible' } },
  { assert: { selector: '[data-part=panel][data-open]', state: 'visible' } },
  { wait: 900 },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=glyph][data-open]', state: 'hidden' } },
  { assert: { selector: '[data-part=panel][data-open]', state: 'hidden' } },
  { wait: 1200 },
]);
