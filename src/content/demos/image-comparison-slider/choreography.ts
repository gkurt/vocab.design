import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=divider][data-at="50"]', state: 'visible' } },
  { assert: { selector: '[data-part=scene-before]', state: 'visible' } },
  { assert: { selector: '[data-part=scene-after]', state: 'visible' } },
  { wait: 700 },
  // Dragging past a label lands on the limit beside it, so the divider reaches an
  // absolute position however the pass began (SPEC §8).
  { moveTo: '[data-part=handle]' },
  { drag: { to: '[data-part=chip-before]' } },
  { wait: 500 },
  { assert: { selector: '[data-part=divider][data-at="16"]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=handle]' },
  { drag: { to: '[data-part=chip-after]' } },
  { wait: 500 },
  { assert: { selector: '[data-part=divider][data-at="84"]', state: 'visible' } },
  { wait: 800 },
  // The keyboard duty, driven from a position the drag just fixed.
  { moveTo: '[data-part=handle]' },
  { press: 'ArrowLeft' },
  { wait: 400 },
  { assert: { selector: '[data-part=divider][data-at="80"]', state: 'visible' } },
  { wait: 700 },
  // Back to the middle, where the frame's own centre is the target.
  { moveTo: '[data-part=handle]' },
  { drag: { to: '[data-part=frame]' } },
  { wait: 500 },
  { assert: { selector: '[data-part=divider][data-at="50"]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { wait: 900 },
]);
