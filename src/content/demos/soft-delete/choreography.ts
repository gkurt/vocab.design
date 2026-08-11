import { steps } from '#src/stage/choreography.ts';

// Both halves of the pattern, in order: the grace window answered, then the same
// window left to lapse. Deleting is not a toggle, so every pass starts from a full
// list and each row is deleted at most once (SPEC §8).
export default steps([
  { assert: { selector: '[data-part=undo-row]', state: 'hidden' } },
  { moveTo: '[data-part=del-tide]' },
  { wait: 300 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=undo-row]', state: 'visible' } },
  { assert: { selector: '[data-part=row-tide]', state: 'hidden' } },
  { assert: { selector: '[data-part=trash][data-count="1"]', state: 'visible' } },
  { wait: 700 },
  // The way back, taken: the note returns and the bin empties again.
  { moveTo: '[data-part=undo]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=row-tide]', state: 'visible' } },
  { assert: { selector: '[data-part=undo-row]', state: 'hidden' } },
  { assert: { selector: '[data-part=trash][data-count="0"]', state: 'visible' } },
  { wait: 900 },
  // The way back, left to expire. What lapses is the offer, not the item: the row
  // stays gone from the list and the bin still holds it.
  { moveTo: '[data-part=del-quay]' },
  { wait: 300 },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=undo-row]', state: 'visible' } },
  { wait: 3400 },
  { assert: { selector: '[data-part=undo-row]', state: 'hidden' } },
  { assert: { selector: '[data-part=row-quay]', state: 'hidden' } },
  { assert: { selector: '[data-part=trash][data-count="1"]', state: 'visible' } },
  { wait: 800 },
]);
