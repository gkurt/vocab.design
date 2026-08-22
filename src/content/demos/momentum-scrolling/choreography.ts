import { steps } from '#src/stage/choreography.ts';

/**
 * The same 150 px stroke twice, differing only in the release. The first lifts while still
 * travelling, so the strip is handed a speed and spends it on its own; the second comes to
 * rest before it lets go, so there is nothing recent left to measure and the strip stops
 * where the hand stopped. Both aim at markers fixed to the window rather than at the cards,
 * which travel, so a pass picked up part-way makes the same gesture at the same speed.
 */
export default steps([
  { assert: { selector: '[data-part=strip][data-phase=idle]', state: 'visible' } },
  { assert: { selector: '[data-part=strip][data-coast=none]', state: 'visible' } },
  // The throw: released mid-motion, and 150 px in 260 ms is well past the throw threshold.
  { moveTo: '[data-part=grip]' },
  { wait: 500 },
  { drag: { to: '[data-part=grip-end]', release: 'moving', ms: 260 } },
  // Judged as early as the script can reach it: the pointer is gone and the strip is
  // still moving, which is the whole claim.
  { assert: { selector: '[data-part=strip][data-phase=coast]', state: 'visible' } },
  { wait: 1500 },
  { assert: { selector: '[data-part=strip][data-phase=rest]', state: 'visible' } },
  { assert: { selector: '[data-part=strip][data-coast=some]', state: 'visible' } },
  { wait: 1000 },
  // The settled stroke back the other way: the same travel, and it hands over nothing.
  { moveTo: '[data-part=grip-end]' },
  { wait: 500 },
  { drag: { to: '[data-part=grip]' } },
  { assert: { selector: '[data-part=strip][data-phase=rest]', state: 'visible' } },
  { assert: { selector: '[data-part=strip][data-coast=none]', state: 'visible' } },
  { wait: 1200 },
]);
