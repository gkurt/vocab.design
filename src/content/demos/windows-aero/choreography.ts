import { steps } from '#src/stage/choreography.ts';

/**
 * The window is dragged across the desktop and back, because a live blur is the one thing
 * about Aero that a still cannot show: the glass over the striped left of the wallpaper and
 * the glass over the glow on the right are not the same picture. Each drag aims at a desktop
 * icon and the demo clamps the result, so both ends are fixed however often attract loops,
 * and the title bar is picked up again before every drag rather than dragged from wherever
 * the last one left the cursor.
 */
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=titlebar]', state: 'visible' } },
  { assert: { selector: '[data-part=window][data-at=left]', state: 'visible' } },
  { assert: { selector: '[data-part=controls]', state: 'visible' } },
  { wait: 800 },

  // Across to the far corner: the frame is now sampling the glow rather than the stripes.
  { moveTo: '[data-part=titlebar]' },
  { wait: 400 },
  { drag: { to: '[data-part=icon-right]' } },
  { wait: 900 },
  { assert: { selector: '[data-part=window][data-at=right]', state: 'visible' } },
  { assert: { selector: '[data-part=titlebar]', state: 'visible' } },
  { wait: 1400 },

  // And back, so a pass picked up anywhere reads the same.
  { moveTo: '[data-part=titlebar]' },
  { wait: 400 },
  { drag: { to: '[data-part=icon-left]' } },
  { wait: 900 },
  { assert: { selector: '[data-part=window][data-at=left]', state: 'visible' } },
  { assert: { selector: '[data-part=title]', state: 'visible' } },
  { wait: 900 },
]);
