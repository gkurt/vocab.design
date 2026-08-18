import { steps } from '#src/stage/choreography.ts';

/**
 * Tab into the pane, scroll it twice, Tab out of it: three stops and a log that moves.
 * Then the same pane without its tabindex, where one Tab crosses the whole panel and the
 * down arrow scrolls nothing, because the ring never reached the region to begin with.
 * The walk clamps at the last stop and each segment reaches its own mode (SPEC §8), and
 * the pass ends focusable, which is the state the pane is the term in.
 */
export default steps([
  { wait: 400 },
  { assert: { selector: '[data-part=log][data-focusable]', state: 'visible' } },
  { assert: { selector: '[data-part=ti][data-ti="0"]', state: 'visible' } },
  { assert: { selector: '[data-part=field][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=log][data-scrolled="0"]', state: 'visible' } },
  { wait: 700 },

  { moveTo: '[data-part=tab]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=log][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=field][data-sim-focus]', state: 'hidden' } },
  { wait: 500 },

  // Inside the stop: the arrows are the region's own scrolling.
  { moveTo: '[data-part=log]' },
  { press: 'ArrowDown' },
  { wait: 600 },
  { assert: { selector: '[data-part=log][data-scrolled="1"]', state: 'visible' } },
  { wait: 400 },
  { press: 'ArrowDown' },
  { wait: 600 },
  { assert: { selector: '[data-part=log][data-scrolled="2"]', state: 'visible' } },
  { assert: { selector: '[data-part=log][data-sim-focus]', state: 'visible' } },
  { wait: 700 },

  { moveTo: '[data-part=tab]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=copy][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=log][data-sim-focus]', state: 'hidden' } },
  { wait: 900 },

  { moveTo: '[data-part=seg-plain]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=log][data-focusable]', state: 'hidden' } },
  { assert: { selector: '[data-part=ti][data-ti=none]', state: 'visible' } },
  { assert: { selector: '[data-part=field][data-sim-focus]', state: 'visible' } },
  { wait: 600 },

  { moveTo: '[data-part=tab]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=copy][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=log][data-sim-focus]', state: 'hidden' } },
  { wait: 700 },

  // The same key, with the ring two stops away: the pane holds still.
  { moveTo: '[data-part=log]' },
  { press: 'ArrowDown' },
  { wait: 600 },
  { assert: { selector: '[data-part=log][data-scrolled="0"]', state: 'visible' } },
  { wait: 900 },

  { moveTo: '[data-part=seg-focusable]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=log][data-focusable]', state: 'visible' } },
  { assert: { selector: '[data-part=ti][data-ti="0"]', state: 'visible' } },
  { wait: 900 },
]);
