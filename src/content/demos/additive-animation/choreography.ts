import { steps } from '#src/stage/choreography.ts';

// One move takes 420 ms, so the second press lands while the first is still running, which is the
// only condition under which the two composites differ. Nothing is judged mid-flight: the claim is
// the settled end position, which the demo measures off the live puck and publishes as
// `data-stacked`. Nudge names a move and Reset names the start, so no step flips what it finds.
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=scene][data-state=rested][data-stacked="0"]', state: 'visible' } },
  { assert: { selector: '[data-part=puck][data-mode=add]', state: 'visible' } },

  { moveTo: '[data-part=nudge]' },
  { click: true },
  { wait: 200 },
  { click: true },
  { wait: 1100 },
  // Two nudges of 90px, composed: the puck really is 180px along.
  { assert: { selector: '[data-part=scene][data-state=rested][data-stacked="2"]', state: 'visible' } },
  { assert: { selector: '[data-part=claim]', state: 'visible' } },

  { moveTo: '[data-part=reset]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=scene][data-stacked="0"]', state: 'visible' } },

  // The counter-example: the same two presses, with the second discarding the first.
  { moveTo: '[data-part=seg-replace]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=puck][data-mode=replace]', state: 'visible' } },
  { moveTo: '[data-part=nudge]' },
  { click: true },
  { wait: 200 },
  { click: true },
  { wait: 1100 },
  { assert: { selector: '[data-part=scene][data-state=rested][data-stacked="1"]', state: 'visible' } },

  { moveTo: '[data-part=seg-add]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=puck][data-mode=add]', state: 'visible' } },
  { assert: { selector: '[data-part=scene][data-stacked="0"]', state: 'visible' } },
  { moveTo: '[data-part=nudge]' },
  { click: true },
  { wait: 200 },
  { click: true },
  { wait: 1100 },
  { assert: { selector: '[data-part=scene][data-stacked="2"]', state: 'visible' } },
  { wait: 700 },
]);
