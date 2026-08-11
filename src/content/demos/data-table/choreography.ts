import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=col-client][aria-sort=ascending]', state: 'visible' } },
  { assert: { selector: '[data-part=row-ada][data-rank="1"]', state: 'visible' } },
  { assert: { selector: '[data-part=clear]', state: 'hidden' } },
  { moveTo: '[data-part=check-nils]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=row-nils][data-selected]', state: 'visible' } },
  // Some but not all, which is a state of its own and shows in the header box.
  { assert: { selector: '[data-part=check-all][aria-checked=mixed]', state: 'visible' } },
  { assert: { selector: '[data-part=clear]', state: 'visible' } },
  { moveTo: '[data-part=sort-amount]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=col-amount][aria-sort=ascending]', state: 'visible' } },
  { assert: { selector: '[data-part=row-nils][data-rank="1"]', state: 'visible' } },
  // The point of the pass: the picked row is still picked after the reordering.
  { assert: { selector: '[data-part=row-nils][data-selected]', state: 'visible' } },
  { wait: 1000 },
  // Clearing is the explicit dismissal, and it lands on the same state however
  // many rows were picked (SPEC §8).
  { moveTo: '[data-part=clear]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=row-nils][data-selected]', state: 'hidden' } },
  { assert: { selector: '[data-part=check-all][aria-checked=mixed]', state: 'hidden' } },
  { assert: { selector: '[data-part=clear]', state: 'hidden' } },
  { assert: { selector: '[data-part=summary]', state: 'visible' } },
  { wait: 900 },
]);
