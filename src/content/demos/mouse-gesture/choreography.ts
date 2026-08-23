import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to arrive.
  { wait: 500 },
  { assert: { selector: '[data-part=pad][data-armed=no]', state: 'visible' } },
  { assert: { selector: '[data-part=pad][data-command=none]', state: 'visible' } },
  // A stroke to the left, held on the right button from start to finish: the press arms the
  // pad, the travel draws, the release reads the shape, and nothing was aimed at a control.
  { moveTo: '[data-part=start]' },
  { wait: 500 },
  { drag: { to: '[data-part=mark-left]', button: 'right' } },
  { wait: 600 },
  { assert: { selector: '[data-part=pad][data-command=back]', state: 'visible' } },
  { assert: { selector: '[data-part=pad][data-armed=no]', state: 'visible' } },
  { wait: 1000 },
  // The mirror image of the same stroke, which is the opposite command.
  { moveTo: '[data-part=start]' },
  { wait: 500 },
  { drag: { to: '[data-part=mark-right]', button: 'right' } },
  { wait: 600 },
  { assert: { selector: '[data-part=pad][data-command=forward]', state: 'visible' } },
  { wait: 1000 },
  // Two segments in ONE gesture: down, then right, without the button coming up between
  // them, which is the whole reason a stroke is a polyline rather than a pair of drags.
  { moveTo: '[data-part=start]' },
  { wait: 500 },
  { drag: { to: '[data-part=mark-corner]', via: ['[data-part=mark-down]'], button: 'right' } },
  { wait: 600 },
  { assert: { selector: '[data-part=pad][data-command=close]', state: 'visible' } },
  { assert: { selector: '[data-part=pad][data-armed=no]', state: 'visible' } },
  { wait: 1200 },
]);
