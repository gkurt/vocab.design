import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Halves: two blocks of six, and twelve columns still under them.
  { assert: { selector: '[data-part=ruler]', state: 'visible' } },
  { assert: { selector: '[data-part=block-0][data-span="6"]', state: 'visible' } },
  { assert: { selector: '[data-part=block-1][data-span="6"]', state: 'visible' } },
  { assert: { selector: '[data-part=block-2]', state: 'hidden' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-thirds]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=seg-thirds][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=block-2][data-span="4"]', state: 'visible' } },
  { assert: { selector: '[data-part=block-3]', state: 'hidden' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-quarters]' },
  { click: true },
  { wait: 900 },
  // Quarters: a fourth block fills a track that was already reserved.
  { assert: { selector: '[data-part=block-3][data-span="3"]', state: 'visible' } },
  { assert: { selector: '[data-part=ruler]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-split]' },
  { click: true },
  { wait: 900 },
  // The asymmetric division, spanning the same columns as every symmetric one.
  { assert: { selector: '[data-part=block-0][data-span="8"]', state: 'visible' } },
  { assert: { selector: '[data-part=block-1][data-span="4"]', state: 'visible' } },
  { assert: { selector: '[data-part=block-2]', state: 'hidden' } },
  { wait: 1200 },
  // Each segment names a division, so the way back is a division too, not an undo.
  { moveTo: '[data-part=seg-halves]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=region][data-division="halves"]', state: 'visible' } },
  { assert: { selector: '[data-part=block-0][data-span="6"]', state: 'visible' } },
  { wait: 800 },
]);
