import { steps } from '#src/stage/choreography.ts';

// One item crosses between the lists and comes back. The proof is on both ends at once:
// the basket row is gone, the parked row is there, the count has moved, and the row the
// item left is holding the undo rather than a message that has already faded (SPEC §8).
export default steps([
  { wait: 600 },
  { assert: { selector: '[data-part=saved-notebook]', state: 'visible' } },
  { assert: { selector: '[data-part=saved-list][data-count="1"]', state: 'visible' } },
  { assert: { selector: '[data-part=cart-mug]', state: 'visible' } },
  { assert: { selector: '[data-part=saved-mug]', state: 'hidden' } },
  { assert: { selector: '[data-part=undo-mug]', state: 'hidden' } },
  { wait: 500 },
  { moveTo: '[data-part=save-mug]' },
  { wait: 350 },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=cart-mug]', state: 'hidden' } },
  { assert: { selector: '[data-part=undo-mug]', state: 'visible' } },
  { assert: { selector: '[data-part=saved-mug]', state: 'visible' } },
  { assert: { selector: '[data-part=saved-list][data-count="2"]', state: 'visible' } },
  { assert: { selector: '[data-part=saved-notebook]', state: 'visible' } },
  { wait: 1700 },
  { moveTo: '[data-part=undo-btn-mug]' },
  { wait: 350 },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=cart-mug]', state: 'visible' } },
  { assert: { selector: '[data-part=undo-mug]', state: 'hidden' } },
  { assert: { selector: '[data-part=saved-mug]', state: 'hidden' } },
  { assert: { selector: '[data-part=saved-list][data-count="1"]', state: 'visible' } },
  { wait: 1000 },
]);
