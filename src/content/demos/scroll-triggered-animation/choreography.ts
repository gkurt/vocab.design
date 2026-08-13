import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 400 },
  // The two cards inside the line at rest have already played; the two below it wait.
  { assert: { selector: '[data-part=card-a][data-played]', state: 'visible' } },
  { assert: { selector: '[data-part=card-c]', state: 'hidden' } },
  { moveTo: '[data-part=page]' },
  { scroll: { y: 100 } },
  // Clear of the 420 ms entrance.
  { wait: 800 },
  { assert: { selector: '[data-part=card-c][data-played]', state: 'visible' } },
  // The card still below the line has not been cued by the scroll that passed it by.
  { assert: { selector: '[data-part=card-d][data-played]', state: 'hidden' } },
  { wait: 600 },
  { scroll: { y: 120 } },
  { wait: 800 },
  { assert: { selector: '[data-part=card-d][data-played]', state: 'visible' } },
  { wait: 700 },
  // All the way back to the top: a trigger is spent, so nothing rewinds.
  { scroll: { y: -400 } },
  { wait: 700 },
  { assert: { selector: '[data-part=card-c][data-played]', state: 'visible' } },
  { assert: { selector: '[data-part=card-d][data-played]', state: 'visible' } },
  { wait: 600 },
]);
