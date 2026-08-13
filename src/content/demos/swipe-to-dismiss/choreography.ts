import { steps } from '#src/stage/choreography.ts';

// Two throws from the same starting point: one that stops short of the threshold and
// comes back, one that passes it and does not. The card has to be moved to again
// before the second drag, because a drag leaves the pointer on the mark it landed on.
export default steps([
  { assert: { selector: '[data-part=card][data-state="resting"]', state: 'visible' } },
  { assert: { selector: '[data-part=undo-row]', state: 'hidden' } },
  { moveTo: '[data-part=card]' },
  { wait: 400 },
  { drag: { to: '[data-part=mark-short]' } },
  { wait: 600 },
  { assert: { selector: '[data-part=card][data-state="resting"]', state: 'visible' } },
  { assert: { selector: '[data-part=undo-row]', state: 'hidden' } },
  { wait: 700 },
  { moveTo: '[data-part=card]' },
  { wait: 300 },
  { drag: { to: '[data-part=mark-far]' } },
  { wait: 700 },
  { assert: { selector: '[data-part=card][data-state="gone"]', state: 'hidden' } },
  { assert: { selector: '[data-part=undo-row]', state: 'visible' } },
  { wait: 1400 },
]);
