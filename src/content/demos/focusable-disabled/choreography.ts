import { steps } from '#src/stage/choreography.ts';

/**
 * Three stops with aria-disabled and two with the disabled attribute, across a row that draws
 * the same either way. The middle stop is the whole difference: reaching it is what lets the
 * description be read at all, and the second pass crosses the row without ever offering it.
 * Each segment reaches its own spelling and the walk clamps at the last stop (SPEC §8); the
 * pass ends on aria-disabled, which is the state the button is the term in.
 */
export default steps([
  { wait: 400 },
  { assert: { selector: '[data-part=submit][data-soft]', state: 'visible' } },
  { assert: { selector: '[data-part=submit][aria-disabled="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=back][data-sim-focus]', state: 'visible' } },
  { wait: 700 },

  { moveTo: '[data-part=tab]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=submit][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=say][data-at=submit]', state: 'visible' } },
  { assert: { selector: '[data-part=back][data-sim-focus]', state: 'hidden' } },
  { wait: 900 },

  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=help][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=submit][data-sim-focus]', state: 'hidden' } },
  { wait: 800 },

  { moveTo: '[data-part=seg-hard]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=submit][data-soft]', state: 'hidden' } },
  { assert: { selector: '[data-part=submit][disabled]', state: 'visible' } },
  { assert: { selector: '[data-part=back][data-sim-focus]', state: 'visible' } },
  { wait: 700 },

  // One press crosses the whole row: the button is drawn but no longer offered.
  { moveTo: '[data-part=tab]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=help][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=submit][data-sim-focus]', state: 'hidden' } },
  { assert: { selector: '[data-part=say][data-at=help]', state: 'visible' } },
  { wait: 1000 },

  { moveTo: '[data-part=seg-soft]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=submit][data-soft]', state: 'visible' } },
  { assert: { selector: '[data-part=submit][aria-disabled="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=back][data-sim-focus]', state: 'visible' } },
  { wait: 900 },
]);
