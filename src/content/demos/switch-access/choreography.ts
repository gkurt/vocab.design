import { steps } from '#src/stage/choreography.ts';

/**
 * Watch the highlight step, press the one button, and whatever was being offered is what gets
 * activated. The claims are made on the group's own state rather than on which target the
 * scan happened to be resting on, because the point is that a switch user gets whichever one
 * the timer offers. Resume reaches "scanning" and the switch reaches "stopped", so neither
 * control toggles (SPEC §8).
 */
export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=group][data-state=scanning]', state: 'visible' } },
  { assert: { selector: '[data-part=result][data-state=none]', state: 'visible' } },
  { wait: 1600 },

  { moveTo: '[data-part=switch]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=group][data-state=stopped]', state: 'visible' } },
  { assert: { selector: '[data-part=result][data-state=chosen]', state: 'visible' } },
  { wait: 1200 },

  { moveTo: '[data-part=resume]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=group][data-state=scanning]', state: 'visible' } },
  { wait: 1800 },

  { moveTo: '[data-part=switch]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=group][data-state=stopped]', state: 'visible' } },
  { assert: { selector: '[data-part=result][data-state=chosen]', state: 'visible' } },
  { wait: 1000 },
]);
