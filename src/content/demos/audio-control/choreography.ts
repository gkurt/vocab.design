import { steps } from '#src/stage/choreography.ts';

/**
 * The video is already playing at mount, and the player remounts before every pass, so the noise is
 * there to be stopped without a control to start it. The stop is pressed in the mode that offers one,
 * then the same page is shown with no stop at all, where nothing the script can do makes the voice
 * audible. Each segment reaches an absolute state (SPEC §8).
 */
export default steps([
  { wait: 800 },
  { assert: { selector: '[data-part=media][data-playing=yes]', state: 'visible' } },
  { assert: { selector: '[data-part=heard][data-state=masked]', state: 'visible' } },
  { assert: { selector: '[data-part=stop]', state: 'visible' } },
  { wait: 500 },

  { moveTo: '[data-part=stop]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=media][data-playing=no]', state: 'visible' } },
  { assert: { selector: '[data-part=heard][data-state=clear]', state: 'visible' } },
  { assert: { selector: '[data-part=voice]', state: 'visible' } },
  { wait: 1300 },

  { moveTo: '[data-part=seg-none]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=stop]', state: 'hidden' } },
  { assert: { selector: '[data-part=media][data-playing=yes]', state: 'visible' } },
  { assert: { selector: '[data-part=heard][data-state=masked]', state: 'visible' } },
  { assert: { selector: '[data-part=caption][data-mode=none]', state: 'visible' } },
  { wait: 1800 },

  { moveTo: '[data-part=seg-control]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=stop]', state: 'visible' } },
  { assert: { selector: '[data-part=media][data-playing=yes]', state: 'visible' } },
  { assert: { selector: '[data-part=heard][data-state=masked]', state: 'visible' } },
  { wait: 600 },

  { moveTo: '[data-part=stop]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=heard][data-state=clear]', state: 'visible' } },
  { wait: 800 },
]);
