import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=row-ember][data-index="1"]', state: 'visible' } },
  // The grip picks the row up, and the drag ends over a fixed row, so the order
  // it produces is the same however the pass started (SPEC §8).
  { moveTo: '[data-part=grip-ember]' },
  { drag: { to: '[data-part=row-dune]' } },
  { wait: 600 },
  { assert: { selector: '[data-part=row-ember][data-index="0"]', state: 'visible' } },
  { assert: { selector: '[data-part=row-dune][data-index="1"]', state: 'visible' } },
  { wait: 1000 },
  // The same gesture started on the title: text selects, and the order holds.
  { moveTo: '[data-part=text-lagoon]' },
  { drag: { to: '[data-part=row-dune]' } },
  { wait: 600 },
  { assert: { selector: '[data-part=text-lagoon][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=row-lagoon][data-index="2"]', state: 'visible' } },
  { assert: { selector: '[data-part=row-ember][data-index="0"]', state: 'visible' } },
  { wait: 1100 },
]);
