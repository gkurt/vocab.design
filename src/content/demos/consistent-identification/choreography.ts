import { steps } from '#src/stage/choreography.ts';

/**
 * One name across three screens, then three names for the same function, with the control pressed on
 * two of the renamed screens to show that the function never changed. Each pick is absolute and
 * resets the screens (SPEC §8), and the naming claims are aimed at the per-screen lines, each of
 * which reports that screen alone.
 */
export default steps([
  { wait: 800 },
  { assert: { selector: '[data-part=name-2][data-mode=consistent]', state: 'visible' } },
  { assert: { selector: '[data-part=say-2][data-name=save]', state: 'visible' } },
  { assert: { selector: '[data-part=say-3][data-name=save]', state: 'visible' } },
  { wait: 500 },

  { moveTo: '[data-part=seg-vary]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=name-2][data-mode=vary]', state: 'visible' } },
  { assert: { selector: '[data-part=say-2][data-name=store]', state: 'visible' } },
  { assert: { selector: '[data-part=say-3][data-name=none]', state: 'visible' } },
  { assert: { selector: '[data-part=name-3]', state: 'hidden' } },
  { wait: 600 },

  { moveTo: '[data-part=btn-2]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=done-2][data-state=saved]', state: 'visible' } },
  { assert: { selector: '[data-part=done-3][data-state=saved]', state: 'hidden' } },

  { moveTo: '[data-part=btn-3]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=done-3][data-state=saved]', state: 'visible' } },
  { assert: { selector: '[data-part=say-2][data-name=store]', state: 'visible' } },
  { wait: 1400 },

  { moveTo: '[data-part=seg-consistent]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=say-2][data-name=save]', state: 'visible' } },
  { assert: { selector: '[data-part=name-3]', state: 'visible' } },
  { assert: { selector: '[data-part=done-2][data-state=saved]', state: 'hidden' } },
  { wait: 700 },
]);
