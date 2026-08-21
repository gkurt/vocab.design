import { steps } from '#src/stage/choreography.ts';

/*
 * A still script (SPEC §8): capitalisation is the whole claim, and every label on the
 * screen already carries it. Nothing here has a second state, and hovering a control
 * whose text is the point would demonstrate nothing.
 */
export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 500 },
  { assert: { selector: '[data-part=labels][data-case="sentence"]', state: 'visible' } },
  { assert: { selector: '[data-part=screen-title]', state: 'visible' } },
  { wait: 1000 },
  { assert: { selector: '[data-part=row-mentions]', state: 'visible' } },
  { assert: { selector: '[data-part=actions]', state: 'visible' } },
  { assert: { selector: '[data-part=save]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=rules]', state: 'visible' } },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 700 },
]);
