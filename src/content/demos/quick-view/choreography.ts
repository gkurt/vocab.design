import { steps } from '#src/stage/choreography.ts';

// Each row's button only opens, and the panel re-reads whichever row was pressed, so a
// pass picked up anywhere still peeks rather than closes (SPEC §8).
export default steps([
  { assert: { selector: '[data-part=quickview]', state: 'hidden' } },
  { assert: { selector: '[data-part=filter][data-selected]', state: 'visible' } },
  { moveTo: '[data-part=open-crate]' },
  { wait: 350 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=quickview]', state: 'visible' } },
  { wait: 1000 },
  { moveTo: '[data-part=qv-close]' },
  { click: true },
  { wait: 450 },
  { assert: { selector: '[data-part=quickview]', state: 'hidden' } },
  // The list was never left: the filter still holds and the row is where it was.
  { assert: { selector: '[data-part=filter][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=row-crate]', state: 'visible' } },
  { wait: 800 },
  // A second peek, this one acted on from inside the summary.
  { moveTo: '[data-part=open-throw]' },
  { wait: 300 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=quickview]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=qv-add]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=quickview]', state: 'hidden' } },
  { assert: { selector: '[data-part=bag][data-count="1"]', state: 'visible' } },
  { assert: { selector: '[data-part=row-throw]', state: 'visible' } },
  { wait: 800 },
]);
