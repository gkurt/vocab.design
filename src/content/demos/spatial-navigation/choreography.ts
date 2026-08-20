import { steps } from '#src/stage/choreography.ts';

/**
 * Five presses of a remote's direction pad, each landing on the nearest card that way. Three of
 * them disagree with the source order printed on the cards, one agrees, and the last jumps the
 * empty cell, which a sequence walk could never do. Every press moves on to a new card rather
 * than toggling between two (SPEC §8).
 */
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=tile-news][data-sim-focus]', state: 'visible' } },
  { moveTo: '[data-part=grid]' },
  { wait: 400 },

  { press: 'ArrowRight' },
  { wait: 600 },
  { assert: { selector: '[data-part=tile-live][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-agree=no]', state: 'visible' } },
  { wait: 800 },

  { press: 'ArrowRight' },
  { wait: 600 },
  { assert: { selector: '[data-part=tile-films][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=tile-live][data-sim-focus]', state: 'hidden' } },
  { wait: 800 },

  { press: 'ArrowDown' },
  { wait: 600 },
  { assert: { selector: '[data-part=tile-store][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-at=store]', state: 'visible' } },
  { assert: { selector: '[data-part=caption][data-agree=no]', state: 'visible' } },
  { wait: 900 },

  { press: 'ArrowLeft' },
  { wait: 600 },
  { assert: { selector: '[data-part=tile-kids][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-agree=yes]', state: 'visible' } },
  { wait: 900 },

  // Up out of Kids: the cell directly above is empty, so the ring jumps it entirely.
  { press: 'ArrowUp' },
  { wait: 600 },
  { assert: { selector: '[data-part=tile-live][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-agree=no]', state: 'visible' } },
  { assert: { selector: '[data-part=tile-games][data-sim-focus]', state: 'hidden' } },
  { wait: 1200 },
]);
