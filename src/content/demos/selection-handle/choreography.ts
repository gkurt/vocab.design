import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=word-10][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=word-15][data-selected]', state: 'hidden' } },
  // The end grip is dragged to an absolute word rather than nudged, so a resumed pass
  // lands on the same range every time (SPEC §8).
  { moveTo: '[data-part=handle-end]' },
  { wait: 500 },
  { drag: { to: '[data-part=word-15]' } },
  { wait: 600 },
  { assert: { selector: '[data-part=word-15][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=word-16][data-selected]', state: 'hidden' } },
  { assert: { selector: '[data-part=page][data-to="15"]', state: 'visible' } },
  { wait: 1200 },
  // The other end moves on its own, which is the whole point of having two grips.
  { moveTo: '[data-part=handle-start]' },
  { wait: 500 },
  { drag: { to: '[data-part=word-5]' } },
  { wait: 600 },
  { assert: { selector: '[data-part=word-5][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=word-4][data-selected]', state: 'hidden' } },
  { assert: { selector: '[data-part=page][data-from="5"]', state: 'visible' } },
  { wait: 1400 },
]);
