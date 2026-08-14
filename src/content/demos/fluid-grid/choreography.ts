import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=fluid]', state: 'visible' } },
  { assert: { selector: '[data-part=viewport][data-width=narrow]', state: 'visible' } },
  // Narrow: all three proportional cards are still in the frame, while the pixel
  // columns have run off the edge and taken the third card with them.
  { assert: { selector: '[data-part=fluid-card-3]', state: 'visible' } },
  { assert: { selector: '[data-part=fixed][data-overflowing]', state: 'visible' } },
  { assert: { selector: '[data-part=fixed][data-slack]', state: 'hidden' } },
  { wait: 700 },
  { moveTo: '[data-part=seg-wide]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=seg-wide][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=viewport][data-width=wide]', state: 'visible' } },
  // Wide: the proportional cards took the new space, the pixel ones left it empty.
  { assert: { selector: '[data-part=fluid-card-3]', state: 'visible' } },
  { assert: { selector: '[data-part=fixed][data-slack]', state: 'visible' } },
  { assert: { selector: '[data-part=fixed][data-overflowing]', state: 'hidden' } },
  { wait: 1200 },
  // Each segment names a width, so the way back is a width too, not an undo.
  { moveTo: '[data-part=seg-narrow]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=fixed][data-overflowing]', state: 'visible' } },
  { assert: { selector: '[data-part=fluid-card-3]', state: 'visible' } },
  { assert: { selector: '[data-part=fluid]', state: 'visible' } },
  { wait: 800 },
]);
