import { steps } from '#src/stage/choreography.ts';

// Two drags of the same duration over very different distances. Both claims are latched at the
// moment the pointer is released, so neither of them is racing the decay: `data-peak` says a lean
// happened at all, and `data-versus` compares this gesture's lean with the one before it, which is
// the proportionality claim stated as a ratio rather than as a number that would depend on how fast
// the machine delivered the moves.
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=card][data-motion=square]', state: 'visible' } },
  { assert: { selector: '[data-part=lane]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },

  // A short haul.
  { moveTo: '[data-part=card]' },
  { wait: 400 },
  { drag: { to: '[data-part=spot-b]' } },
  { assert: { selector: '[data-part=card][data-peak=some]', state: 'visible' } },
  { assert: { selector: '[data-part=card][data-versus=first]', state: 'visible' } },

  // Given a second to decay, the card is square again with nothing driving it.
  { wait: 1500 },
  { assert: { selector: '[data-part=card][data-motion=square]', state: 'visible' } },

  { moveTo: '[data-part=reset]' },
  { wait: 400 },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=card][data-peak=none]', state: 'visible' } },

  // The same gesture, three and a half times the distance in the same time.
  { moveTo: '[data-part=card]' },
  { wait: 400 },
  { drag: { to: '[data-part=spot-c]' } },
  { assert: { selector: '[data-part=card][data-peak=some]', state: 'visible' } },
  { assert: { selector: '[data-part=card][data-versus=faster]', state: 'visible' } },

  { wait: 1500 },
  { assert: { selector: '[data-part=card][data-motion=square]', state: 'visible' } },

  { moveTo: '[data-part=reset]' },
  { wait: 400 },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=card][data-peak=none]', state: 'visible' } },
  { wait: 600 },
]);
