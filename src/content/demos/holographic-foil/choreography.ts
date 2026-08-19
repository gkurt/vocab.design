import { steps } from '#src/stage/choreography.ts';

/**
 * The foil answers a drag, so the script orbits it: right past the clamp, then all
 * the way back left, with the grips overshooting the tilt clamp on purpose so the
 * asserted states never depend on exact pixel geometry. The opening wait lets the
 * mount fade finish before the first claim is judged.
 */
export default steps([
  { wait: 450 },
  { assert: { selector: '[data-part=card][data-tilt=rest]', state: 'visible' } },
  { assert: { selector: '[data-part=strip]', state: 'visible' } },
  { moveTo: '[data-part=card]' },
  { wait: 350 },
  { drag: { to: '[data-part=grip-right]' } },
  { wait: 500 },
  { assert: { selector: '[data-part=card][data-tilt=right]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=card]' },
  { wait: 300 },
  { drag: { to: '[data-part=grip-left]' } },
  { wait: 500 },
  { assert: { selector: '[data-part=card][data-tilt=left]', state: 'visible' } },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 1000 },
]);
