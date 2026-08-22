import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=bar-1][data-current]', state: 'visible' } },
  // A tap on the right half of the card is the next card, which is the grammar's
  // other input: inside a touch scope a single tap is exactly a finger's tap.
  { moveTo: '[data-part=next]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=bar-2][data-current]', state: 'visible' } },
  { click: true },
  { wait: 250 },
  { assert: { selector: '[data-part=bar-3][data-current]', state: 'visible' } },
  { assert: { selector: '[data-part=bar-1][data-seen]', state: 'visible' } },
  // The same spot, held rather than tapped, and the two inputs part ways: the press
  // ends without a click, so nothing advances, and the run stops where it is. The hold
  // outlasts a whole dwell, so an unpaused run would be on the last card by the time
  // the finger lifts. It starts straight after the tap, so the third card still has
  // most of its dwell in hand.
  { hold: 3200 },
  { assert: { selector: '[data-part=bar-3][data-current]', state: 'visible' } },
  { assert: { selector: '[data-part=bar-4][data-current]', state: 'hidden' } },
  // Released, the run picks up the time the third card had left.
  { wait: 3000 },
  { assert: { selector: '[data-part=bar-4][data-current]', state: 'visible' } },
  // The last card's own dwell is 2.6s of travelling fill, and the tail outlasts it, so the
  // loop's remount lands on a story that has finished rather than cutting the bar mid-fill.
  { wait: 2800 },
]);
