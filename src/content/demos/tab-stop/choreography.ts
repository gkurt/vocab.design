import { steps } from '#src/stage/choreography.ts';

/**
 * One Tab into the toolbar, two arrows inside it, one Tab out of it: three presses to cross
 * a strip that holds seven focusable elements. The arrows prove the group is a single stop,
 * because the count never moves while the active button does. The walk clamps at the last
 * stop rather than wrapping, so a pass joined halfway proves the same thing (SPEC §8).
 */
export default steps([
  { wait: 400 },
  { assert: { selector: '[data-part=stop-field][data-current]', state: 'visible' } },
  { assert: { selector: '[data-part=count][data-n="0"]', state: 'visible' } },
  { assert: { selector: '[data-part=tool-edit][data-ti="0"]', state: 'visible' } },
  { assert: { selector: '[data-part=tool-copy][data-ti="-1"]', state: 'visible' } },
  { wait: 700 },

  { moveTo: '[data-part=tab]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=stop-toolbar][data-current]', state: 'visible' } },
  { assert: { selector: '[data-part=count][data-n="1"]', state: 'visible' } },
  { assert: { selector: '[data-part=tool-edit][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=field][data-sim-focus]', state: 'hidden' } },
  { wait: 700 },

  // Inside the stop: the arrows move the roving pair and Tab is never pressed.
  { moveTo: '[data-part=toolbar]' },
  { press: 'ArrowRight' },
  { wait: 600 },
  { assert: { selector: '[data-part=tool-copy][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=tool-copy][data-ti="0"]', state: 'visible' } },
  { assert: { selector: '[data-part=tool-edit][data-ti="-1"]', state: 'visible' } },
  { assert: { selector: '[data-part=count][data-n="1"]', state: 'visible' } },
  { wait: 500 },
  { press: 'ArrowRight' },
  { wait: 600 },
  { assert: { selector: '[data-part=tool-share][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=stop-toolbar][data-current]', state: 'visible' } },
  { assert: { selector: '[data-part=count][data-n="1"]', state: 'visible' } },
  { wait: 800 },

  { moveTo: '[data-part=tab]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=stop-publish][data-current]', state: 'visible' } },
  { assert: { selector: '[data-part=count][data-n="2"]', state: 'visible' } },
  { assert: { selector: '[data-part=publish][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=tool-share][data-sim-focus]', state: 'hidden' } },
  { wait: 1100 },
]);
