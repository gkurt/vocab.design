import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to arrive.
  { wait: 500 },
  { assert: { selector: '[data-part=canvas][data-chose=none]', state: 'visible' } },
  { assert: { selector: '[data-part=ring]', state: 'hidden' } },
  // The novice path: a press held in place, which the player makes by dragging a point to
  // itself. The pointer never travels, so the reveal timer runs out and the ring is drawn.
  { moveTo: '[data-part=press-point]' },
  { wait: 500 },
  { drag: { to: '[data-part=press-point]' } },
  { wait: 400 },
  { assert: { selector: '[data-part=ring]', state: 'visible' } },
  { assert: { selector: '[data-part=canvas][data-path=ring]', state: 'visible' } },
  { wait: 800 },
  // Picked from the drawn ring, which is what the ring is for.
  { moveTo: '[data-part=sector-duplicate]' },
  { wait: 400 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=canvas][data-chose=duplicate]', state: 'visible' } },
  { assert: { selector: '[data-part=ring]', state: 'hidden' } },
  { wait: 1000 },
  // The expert path: the same press, carried north before the ring would have been drawn.
  // The direction is the whole answer, and the menu is never shown at all.
  { moveTo: '[data-part=press-point]' },
  { wait: 500 },
  { drag: { to: '[data-part=mark-north]' } },
  { wait: 400 },
  { assert: { selector: '[data-part=canvas][data-chose=delete]', state: 'visible' } },
  { assert: { selector: '[data-part=canvas][data-path=mark]', state: 'visible' } },
  { assert: { selector: '[data-part=ring]', state: 'hidden' } },
  { wait: 1100 },
]);
