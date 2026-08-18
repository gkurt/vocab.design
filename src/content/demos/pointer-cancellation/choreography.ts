import { steps } from '#src/stage/choreography.ts';

/**
 * Three gestures on two buttons. A clean press and release on the release-event button deletes
 * the draft; the same press slid off before release deletes nothing at all; the identical gesture
 * on the press-event button finds the draft already gone. Reset is an explicit step rather than a
 * toggle, and the last one returns the specimen to its mount state (SPEC §8).
 */
export default steps([
  { wait: 600 },
  { assert: { selector: '[data-part=log][data-last=none]', state: 'visible' } },
  { assert: { selector: '[data-part=state-up][data-state=idle]', state: 'visible' } },
  { assert: { selector: '[data-part=state-down][data-state=idle]', state: 'visible' } },
  { wait: 600 },

  { moveTo: '[data-part=up-btn]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=state-up][data-state=fired]', state: 'visible' } },
  { assert: { selector: '[data-part=log][data-last=up-fired]', state: 'visible' } },
  { wait: 1000 },

  { moveTo: '[data-part=reset]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=state-up][data-state=idle]', state: 'visible' } },
  { assert: { selector: '[data-part=log][data-last=none]', state: 'visible' } },
  { wait: 500 },

  { moveTo: '[data-part=up-btn]' },
  { drag: { to: '[data-part=away]' } },
  { wait: 700 },
  { assert: { selector: '[data-part=state-up][data-state=idle]', state: 'visible' } },
  { assert: { selector: '[data-part=log][data-last=up-cancelled]', state: 'visible' } },
  { wait: 1200 },

  { moveTo: '[data-part=down-btn]' },
  { drag: { to: '[data-part=away]' } },
  { wait: 700 },
  { assert: { selector: '[data-part=state-down][data-state=fired]', state: 'visible' } },
  { assert: { selector: '[data-part=log][data-last=down-late]', state: 'visible' } },
  { wait: 1300 },

  { moveTo: '[data-part=reset]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=state-down][data-state=idle]', state: 'visible' } },
  { assert: { selector: '[data-part=log][data-last=none]', state: 'visible' } },
  { wait: 800 },
]);
