import { steps } from '#src/stage/choreography.ts';

/**
 * The screen with its default strings, then the same screen with written ones, then
 * back. Each segment reaches its own set rather than toggling (SPEC §8), and every
 * assert names the position it is claiming, so the script says which of the three
 * strings it is watching rather than that something changed somewhere.
 */
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=verb][data-set=default]', state: 'visible' } },
  { assert: { selector: '[data-part=helper][data-set=default]', state: 'visible' } },
  { assert: { selector: '[data-part=failure][data-set=default]', state: 'visible' } },
  { wait: 1400 },

  { moveTo: '[data-part=seg-authored]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=verb][data-set=authored]', state: 'visible' } },
  { assert: { selector: '[data-part=helper][data-set=authored]', state: 'visible' } },
  { assert: { selector: '[data-part=failure][data-set=authored]', state: 'visible' } },
  { assert: { selector: '[data-part=caption][data-set=authored]', state: 'visible' } },
  { wait: 1900 },

  { moveTo: '[data-part=seg-default]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=verb][data-set=default]', state: 'visible' } },
  { assert: { selector: '[data-part=failure][data-set=default]', state: 'visible' } },
  { assert: { selector: '[data-part=caption][data-set=default]', state: 'visible' } },
  { wait: 1100 },
]);
