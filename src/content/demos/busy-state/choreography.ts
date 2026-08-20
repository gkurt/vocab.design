import { steps } from '#src/stage/choreography.ts';

/**
 * The load runs from mount, and the player remounts before every pass, so the first claims land
 * mid-load without needing a control to start one. Each segment then reaches an absolute state
 * rather than toggling one, and reloads the region in that state (SPEC §8). Every claim is aimed
 * between two chunks rather than at the instant one lands.
 */
export default steps([
  { wait: 900 },
  { assert: { selector: '[data-part=region][data-loading]', state: 'visible' } },
  { assert: { selector: '[data-part=region][aria-busy="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=row-1]', state: 'visible' } },
  { assert: { selector: '[data-part=log-1]', state: 'hidden' } },
  { wait: 2000 },
  { assert: { selector: '[data-part=region][aria-busy="false"]', state: 'visible' } },
  { assert: { selector: '[data-part=row-3]', state: 'visible' } },
  { assert: { selector: '[data-part=log-1]', state: 'visible' } },
  { assert: { selector: '[data-part=log-3]', state: 'hidden' } },
  { wait: 900 },

  { moveTo: '[data-part=seg-omitted]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=region][data-mode=omitted]', state: 'visible' } },
  { assert: { selector: '[data-part=log-1]', state: 'visible' } },
  { assert: { selector: '[data-part=log-3]', state: 'hidden' } },
  { wait: 1900 },
  { assert: { selector: '[data-part=log-3]', state: 'visible' } },
  { assert: { selector: '[data-part=log-1][data-cut]', state: 'visible' } },
  { assert: { selector: '[data-part=region][data-loading]', state: 'hidden' } },
  { wait: 1400 },

  { moveTo: '[data-part=seg-declared]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=region][aria-busy="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=log-1]', state: 'hidden' } },
  { wait: 2000 },
  { assert: { selector: '[data-part=log-1]', state: 'visible' } },
  { assert: { selector: '[data-part=caption][data-mode=declared]', state: 'visible' } },
  { wait: 900 },
]);
