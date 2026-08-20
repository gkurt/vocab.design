import { steps } from '#src/stage/choreography.ts';

/**
 * The same press on the same padding, twice: once into a shadow root that forwards it, once into
 * one that does not. Each segment reaches an absolute state rather than toggling one, and the press
 * is aimed at the padding band rather than at the control (SPEC §8).
 */
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=pad][data-delegated]', state: 'visible' } },
  { assert: { selector: '[data-part=active][data-state=none]', state: 'visible' } },
  { assert: { selector: '[data-part=field][data-sim-focus]', state: 'hidden' } },
  { wait: 400 },

  { moveTo: '[data-part=pad]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=field][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=active][data-state=inner]', state: 'visible' } },
  { wait: 1500 },

  { moveTo: '[data-part=seg-off]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=pad][data-delegated]', state: 'hidden' } },
  { assert: { selector: '[data-part=field][data-sim-focus]', state: 'hidden' } },
  { assert: { selector: '[data-part=caption][data-mode=off]', state: 'visible' } },
  { wait: 500 },

  { moveTo: '[data-part=pad]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=active][data-state=nowhere]', state: 'visible' } },
  { assert: { selector: '[data-part=field][data-sim-focus]', state: 'hidden' } },
  { wait: 1600 },

  { moveTo: '[data-part=seg-on]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=pad][data-delegated]', state: 'visible' } },
  { assert: { selector: '[data-part=active][data-state=none]', state: 'visible' } },
  { wait: 800 },
]);
