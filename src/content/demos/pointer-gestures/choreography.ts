import { steps } from '#src/stage/choreography.ts';

/**
 * One stroke around the dial, then the same value reached with a single-contact press, then the
 * buttons taken away so the stroke is the only route left. The stroke is one continuous press
 * through waypoints on the arc (SPEC §8), which is what makes it a path-based gesture rather than
 * a jump, and the value claims are aimed at the band the dial lands in rather than at an exact
 * number the pointer's own pace decides.
 */
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=alt]', state: 'visible' } },
  { assert: { selector: '[data-part=source][data-by=none]', state: 'visible' } },
  { wait: 400 },

  { moveTo: '[data-part=stop-1]' },
  { drag: { to: '[data-part=stop-5]', via: ['[data-part=stop-2]', '[data-part=stop-3]', '[data-part=stop-4]'] } },
  { wait: 700 },
  { assert: { selector: '[data-part=value][data-band=high]', state: 'visible' } },
  { assert: { selector: '[data-part=source][data-by=gesture]', state: 'visible' } },
  { wait: 900 },

  { moveTo: '[data-part=minus]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=source][data-by=button]', state: 'visible' } },
  { assert: { selector: '[data-part=value][data-band=high]', state: 'visible' } },
  { wait: 900 },

  { moveTo: '[data-part=seg-gesture]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=alt]', state: 'hidden' } },
  { assert: { selector: '[data-part=caption][data-mode=gesture]', state: 'visible' } },
  { wait: 500 },

  { moveTo: '[data-part=stop-4]' },
  { drag: { to: '[data-part=stop-1]', via: ['[data-part=stop-3]', '[data-part=stop-2]'] } },
  { wait: 700 },
  { assert: { selector: '[data-part=value][data-band=low]', state: 'visible' } },
  { assert: { selector: '[data-part=source][data-by=gesture]', state: 'visible' } },
  { assert: { selector: '[data-part=alt]', state: 'hidden' } },
  { wait: 1400 },

  { moveTo: '[data-part=seg-both]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=alt]', state: 'visible' } },
  { assert: { selector: '[data-part=caption][data-mode=both]', state: 'visible' } },
  { wait: 800 },
]);
