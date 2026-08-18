import { steps } from '#src/stage/choreography.ts';

/**
 * One sign-in, two ways in. The pass fills the code the way a password manager would, signs in
 * with a passkey instead, then switches to the step that tests memory and tries the identical
 * paste, which the field refuses and the counter of routes records. Choosing a mode clears the
 * field and signs the reader out, so both halves start level and the last choice returns the
 * specimen to its mount state (SPEC §8).
 */
export default steps([
  { wait: 600 },
  { assert: { selector: '[data-part=picker][data-value=open]', state: 'visible' } },
  { assert: { selector: '[data-part=passkey]', state: 'visible' } },
  { assert: { selector: '[data-part=test][data-state=none]', state: 'visible' } },
  { wait: 600 },

  { moveTo: '[data-part=paste]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=code][data-filled]', state: 'visible' } },
  { assert: { selector: '[data-part=note][data-state=allowed]', state: 'visible' } },
  { wait: 900 },

  { moveTo: '[data-part=passkey]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=status][data-state=in]', state: 'visible' } },
  { wait: 1200 },

  { moveTo: '[data-part=seg-memory]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=passkey]', state: 'hidden' } },
  { assert: { selector: '[data-part=test][data-state=required]', state: 'visible' } },
  { assert: { selector: '[data-part=status][data-state=out]', state: 'visible' } },
  { assert: { selector: '[data-part=code][data-filled]', state: 'hidden' } },
  { wait: 600 },

  { moveTo: '[data-part=paste]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=note][data-state=blocked]', state: 'visible' } },
  { assert: { selector: '[data-part=code][data-filled]', state: 'hidden' } },
  { wait: 1300 },

  { moveTo: '[data-part=seg-open]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=picker][data-value=open]', state: 'visible' } },
  { assert: { selector: '[data-part=passkey]', state: 'visible' } },
  { assert: { selector: '[data-part=test][data-state=none]', state: 'visible' } },
  { wait: 900 },
]);
