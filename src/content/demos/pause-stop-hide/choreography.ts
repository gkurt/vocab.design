import { steps } from '#src/stage/choreography.ts';

/**
 * One moving region, three levels of escape. The pass lets the carousel turn and the figure
 * refresh, takes the control away so the reader has nothing, gives it back and presses it so
 * everything really stops, then reaches the state that also offers Hide and deletes the movement
 * outright. Choosing what the reader is offered resets the scene to moving, so every press lands
 * on content that was going, and the last choice returns the specimen to its mount state
 * (SPEC §8).
 */
export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=offered][data-value=pause]', state: 'visible' } },
  { assert: { selector: '[data-part=pause]', state: 'visible' } },
  { assert: { selector: '[data-part=hide]', state: 'hidden' } },
  { assert: { selector: '[data-part=scene][data-motion=running]', state: 'visible' } },
  { wait: 1000 },

  { moveTo: '[data-part=seg-none]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=offered][data-value=none]', state: 'visible' } },
  { assert: { selector: '[data-part=pause]', state: 'hidden' } },
  { assert: { selector: '[data-part=offers][data-offered=none]', state: 'visible' } },
  { assert: { selector: '[data-part=scene][data-motion=running]', state: 'visible' } },
  { wait: 1300 },

  { moveTo: '[data-part=seg-pause]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=pause]', state: 'visible' } },
  { assert: { selector: '[data-part=scene][data-motion=running]', state: 'visible' } },
  { wait: 500 },

  { moveTo: '[data-part=pause]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=scene][data-motion=paused]', state: 'visible' } },
  { assert: { selector: '[data-part=moving]', state: 'visible' } },
  { wait: 1300 },

  { moveTo: '[data-part=seg-both]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=hide]', state: 'visible' } },
  { assert: { selector: '[data-part=scene][data-motion=running]', state: 'visible' } },
  { wait: 700 },

  { moveTo: '[data-part=hide]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=scene][data-motion=hidden]', state: 'visible' } },
  { assert: { selector: '[data-part=blanked]', state: 'visible' } },
  { assert: { selector: '[data-part=moving]', state: 'hidden' } },
  { wait: 1100 },

  { moveTo: '[data-part=seg-pause]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=offered][data-value=pause]', state: 'visible' } },
  { assert: { selector: '[data-part=moving]', state: 'visible' } },
  { assert: { selector: '[data-part=hide]', state: 'hidden' } },
  { assert: { selector: '[data-part=scene][data-motion=running]', state: 'visible' } },
  { wait: 900 },
]);
