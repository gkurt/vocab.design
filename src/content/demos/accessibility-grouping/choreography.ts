import { steps } from '#src/stage/choreography.ts';

/**
 * One swipe crosses the grouped card and hears all of it; ungrouped, the same card takes
 * four and the cursor stops on a timestamp that says nothing on its own. The counter is
 * written from the stop list rather than typed in, so the asserts are reading the walk. The
 * walk clamps at the last stop and each segment reaches its own mode (SPEC §8), and the pass
 * ends grouped, which is the state the card is the term in.
 */
export default steps([
  { wait: 400 },
  { assert: { selector: '[data-part=card][data-grouped]', state: 'visible' } },
  { assert: { selector: '[data-part=stops][data-n="1"]', state: 'visible' } },
  { assert: { selector: '[data-part=card][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=say][data-at=card]', state: 'visible' } },
  { wait: 900 },

  { moveTo: '[data-part=seg-ungrouped]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=card][data-grouped]', state: 'hidden' } },
  { assert: { selector: '[data-part=stops][data-n="4"]', state: 'visible' } },
  { assert: { selector: '[data-part=kid-avatar][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=card][data-sim-focus]', state: 'hidden' } },
  { wait: 800 },

  { moveTo: '[data-part=swipe]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=kid-name][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=kid-avatar][data-sim-focus]', state: 'hidden' } },
  { wait: 500 },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=kid-role][data-sim-focus]', state: 'visible' } },
  { wait: 500 },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=kid-time][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=say][data-at=time]', state: 'visible' } },
  { assert: { selector: '[data-part=stops][data-at=time]', state: 'visible' } },
  { wait: 1100 },

  { moveTo: '[data-part=seg-grouped]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=card][data-grouped]', state: 'visible' } },
  { assert: { selector: '[data-part=stops][data-n="1"]', state: 'visible' } },
  { assert: { selector: '[data-part=card][data-sim-focus]', state: 'visible' } },
  { wait: 900 },
]);
