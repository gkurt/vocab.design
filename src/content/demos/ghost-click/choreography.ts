import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=panel][data-phase=idle]', state: 'visible' } },
  { assert: { selector: '[data-part=row-delete][data-ghosted]', state: 'hidden' } },
  { moveTo: '[data-part=replay]' },
  { wait: 400 },
  { click: true },
  // The whole legacy pipeline is 300 ms long, so the claim is made well after it ends.
  { wait: 1100 },
  { assert: { selector: '[data-part=panel][data-phase=ghosted]', state: 'visible' } },
  // The finger was on Dismiss, and Dismiss is what touchend went to.
  { assert: { selector: '[data-part=row-dismiss][data-tapped]', state: 'visible' } },
  // The click, dispatched at the same coordinate, reached the row that moved into it.
  { assert: { selector: '[data-part=row-delete][data-ghosted]', state: 'visible' } },
  { assert: { selector: '[data-part=row-dismiss][data-ghosted]', state: 'hidden' } },
  { wait: 1600 },
]);
