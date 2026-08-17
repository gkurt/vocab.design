import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 400 },
  { assert: { selector: '[data-part=glyphs-code]', state: 'visible' } },
  { assert: { selector: '[data-part=glyphs-grotesque]', state: 'visible' } },
  { wait: 900 },
  // Absolute picks, never a flip: the pass reaches each cluster by name and
  // returns to the first, so a run joined halfway still lands on a stated state.
  { moveTo: '[data-part=seg-o0]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=glyphs-code][data-set=o0]', state: 'visible' } },
  { moveTo: '[data-part=names]' },
  { wait: 900 },
  { assert: { selector: '[data-part=names]', state: 'visible' } },
  { moveTo: '[data-part=seg-rnm]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=glyphs-code][data-set=rnm]', state: 'visible' } },
  { moveTo: '[data-part=row-grotesque]' },
  { wait: 1100 },
  { assert: { selector: '[data-part=word-grotesque]', state: 'visible' } },
  { moveTo: '[data-part=seg-il1]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=glyphs-code][data-set=il1]', state: 'visible' } },
  { moveTo: '[data-part=caption]' },
  { wait: 800 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
]);
