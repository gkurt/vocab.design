import { steps } from '#src/stage/choreography.ts';

/**
 * The poster answers no pointer, so the only input is the picker, and the picker is the whole
 * argument: the layer comes off, a scrim goes on in its place, and the vignette comes back. The
 * opening wait lets the mount fade finish before the first claim, and every state is given room
 * after the opacity transition rather than judged at its edge.
 */
export default steps([
  { wait: 450 },
  { assert: { selector: '[data-part=hero][data-mode=vignette]', state: 'visible' } },
  { assert: { selector: '[data-part=vignette]', state: 'visible' } },
  { assert: { selector: '[data-part=title]', state: 'visible' } },
  { assert: { selector: '[data-part=scrim]', state: 'hidden' } },
  { wait: 900 },

  // Take the layer away, so what the falloff was doing to the picture underneath is readable.
  { moveTo: '[data-part=seg-none]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=hero][data-mode=none]', state: 'visible' } },
  { assert: { selector: '[data-part=vignette]', state: 'hidden' } },
  { assert: { selector: '[data-part=title]', state: 'visible' } },
  { wait: 900 },

  // The same ink, spent one sided: a scrim rather than a vignette.
  { moveTo: '[data-part=seg-scrim]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=hero][data-mode=scrim]', state: 'visible' } },
  { assert: { selector: '[data-part=scrim]', state: 'visible' } },
  { assert: { selector: '[data-part=vignette]', state: 'hidden' } },
  { wait: 900 },

  { moveTo: '[data-part=seg-vignette]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=vignette][data-mode=vignette]', state: 'visible' } },
  { assert: { selector: '[data-part=scrim]', state: 'hidden' } },
  { wait: 700 },
]);
