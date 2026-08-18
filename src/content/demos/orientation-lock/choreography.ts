import { steps } from '#src/stage/choreography.ts';

/**
 * The device starts turned, which is the orientation the lock is visible in and the state
 * `data-pose` on the subject requires (SPEC §6). Standing it upright gives the locked build
 * its app back and proves the wall was the lock rather than a broken layout; turning it again
 * brings the wall back while the other build keeps working throughout. Each segment reaches
 * its own orientation rather than toggling (SPEC §8).
 */
export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=view-locked][data-blocked]', state: 'visible' } },
  { assert: { selector: '[data-part=wall]', state: 'visible' } },
  { assert: { selector: '[data-part=app-locked]', state: 'hidden' } },
  { assert: { selector: '[data-part=app-fluid]', state: 'visible' } },
  { wait: 1100 },

  { moveTo: '[data-part=seg-portrait]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=view-locked][data-blocked]', state: 'hidden' } },
  { assert: { selector: '[data-part=wall]', state: 'hidden' } },
  { assert: { selector: '[data-part=app-locked]', state: 'visible' } },
  { assert: { selector: '[data-part=caption][data-orientation=portrait]', state: 'visible' } },
  { wait: 1400 },

  { moveTo: '[data-part=seg-landscape]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=view-locked][data-blocked]', state: 'visible' } },
  { assert: { selector: '[data-part=wall]', state: 'visible' } },
  { assert: { selector: '[data-part=app-fluid]', state: 'visible' } },
  { wait: 1000 },
]);
