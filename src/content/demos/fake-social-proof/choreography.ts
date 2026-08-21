import { steps } from '#src/stage/choreography.ts';

// Two fabrications at once: a count that does not match the reviews on the page, and a
// buyer announcement cycling four hardcoded names. The honest state prints the count the
// page can actually show, and has nobody to announce.
export default steps([
  { wait: 900 },
  { assert: { selector: '[data-part=review-count][data-mode=fabricated]', state: 'visible' } },
  { assert: { selector: '[data-part=activity]', state: 'visible' } },
  // Long enough for the list to come round again: the same four buyers, in the same order.
  { wait: 4200 },
  { moveTo: '[data-part=mode-genuine]' },
  { wait: 400 },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=review-count][data-mode=genuine]', state: 'visible' } },
  { assert: { selector: '[data-part=activity]', state: 'hidden' } },
  { wait: 1600 },
]);
