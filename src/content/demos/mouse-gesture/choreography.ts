import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to arrive.
  { wait: 500 },
  { assert: { selector: '[data-part=pad][data-armed=no]', state: 'visible' } },
  { assert: { selector: '[data-part=pad][data-command=none]', state: 'visible' } },
  // A stroke to the left. The right press arms the pad, the drag draws, the next right release
  // reads the shape, and nothing along the way was aimed at a control.
  { moveTo: '[data-part=start]' },
  { wait: 500 },
  { rightClick: true },
  { wait: 500 },
  { assert: { selector: '[data-part=pad][data-armed=yes]', state: 'visible' } },
  { drag: { to: '[data-part=mark-left]' } },
  { wait: 400 },
  { rightClick: true },
  { wait: 600 },
  { assert: { selector: '[data-part=pad][data-command=back]', state: 'visible' } },
  { assert: { selector: '[data-part=pad][data-armed=no]', state: 'visible' } },
  { wait: 1000 },
  // The mirror image of the same stroke, which is the opposite command.
  { moveTo: '[data-part=start]' },
  { wait: 500 },
  { rightClick: true },
  { wait: 400 },
  { drag: { to: '[data-part=mark-right]' } },
  { wait: 400 },
  { rightClick: true },
  { wait: 600 },
  { assert: { selector: '[data-part=pad][data-command=forward]', state: 'visible' } },
  { wait: 1000 },
  // Two segments in one gesture: down, then right, which the recognizer reads as one shape.
  { moveTo: '[data-part=start]' },
  { wait: 500 },
  { rightClick: true },
  { wait: 400 },
  { drag: { to: '[data-part=mark-down]' } },
  { wait: 300 },
  { drag: { to: '[data-part=mark-corner]' } },
  { wait: 400 },
  { rightClick: true },
  { wait: 600 },
  { assert: { selector: '[data-part=pad][data-command=close]', state: 'visible' } },
  { assert: { selector: '[data-part=pad][data-armed=no]', state: 'visible' } },
  { wait: 1200 },
]);
