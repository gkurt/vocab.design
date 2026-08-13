import { steps } from '#src/stage/choreography.ts';

// Two gestures on the object itself, each proved by state the card carries rather
// than by the fact that something moved (SPEC §8): a push that lands it in the drop
// zone, then a pull on its own corner that widens it.
export default steps([
  { assert: { selector: '[data-part=card]', state: 'visible' } },
  { assert: { selector: '[data-part=card][data-docked]', state: 'hidden' } },
  { assert: { selector: '[data-part=card][data-wide]', state: 'hidden' } },
  { wait: 500 },
  { moveTo: '[data-part=card]' },
  { drag: { to: '[data-part=dock]' } },
  { wait: 600 },
  { assert: { selector: '[data-part=card][data-docked]', state: 'visible' } },
  { assert: { selector: '[data-part=card][data-wide]', state: 'hidden' } },
  { wait: 800 },
  { moveTo: '[data-part=grip]' },
  { drag: { to: '[data-part=guide]' } },
  { wait: 600 },
  // Widened by its own corner, and still where the first gesture put it.
  { assert: { selector: '[data-part=card][data-wide]', state: 'visible' } },
  { assert: { selector: '[data-part=card][data-docked]', state: 'visible' } },
  { wait: 1400 },
]);
