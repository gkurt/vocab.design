import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 400 },
  { assert: { selector: '[data-part=scene][data-phase=rest]', state: 'visible' } },
  // Each pick is an absolute value, so a fast-forwarded or resumed pass lands where it said.
  { moveTo: '[data-part=seg-forwards]' },
  { click: true },
  { assert: { selector: '[data-part=scene][data-fill=forwards]', state: 'visible' } },
  { moveTo: '[data-part=play]' },
  { click: true },
  // Judged inside the 900 ms delay: the keyframes have not started yet.
  { assert: { selector: '[data-part=scene][data-phase=delay]', state: 'visible' } },
  { wait: 1600 },
  { assert: { selector: '[data-part=scene][data-phase=after][data-rest=keyframe]', state: 'visible' } },
  { assert: { selector: '[data-part=tile]', state: 'visible' } },
  { wait: 500 },
  { moveTo: '[data-part=seg-none]' },
  { click: true },
  { assert: { selector: '[data-part=scene][data-fill=none][data-phase=rest]', state: 'visible' } },
  { moveTo: '[data-part=play]' },
  { click: true },
  { wait: 1900 },
  // The same move, and this time the tile is back where its own style put it.
  { assert: { selector: '[data-part=scene][data-phase=after][data-rest=own]', state: 'visible' } },
  { assert: { selector: '[data-part=tile]', state: 'visible' } },
  { wait: 600 },
]);
