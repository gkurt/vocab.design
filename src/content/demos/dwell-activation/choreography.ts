import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=tool-line][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=dwell][data-selected]', state: 'hidden' } },
  // Crossing the tool on the way to the page: the ring fills part way and empties again,
  // which is the failure a dwell target has to make survivable.
  { moveTo: '[data-part=dwell]' },
  { moveTo: '[data-part=away]' },
  { wait: 500 },
  { assert: { selector: '[data-part=toolbar][data-outcome=cancelled]', state: 'visible' } },
  { assert: { selector: '[data-part=dwell][data-selected]', state: 'hidden' } },
  { wait: 700 },
  // Resting still long enough is the click. No press is ever sent.
  { moveTo: '[data-part=dwell]' },
  { wait: 1700 },
  { assert: { selector: '[data-part=dwell][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=toolbar][data-outcome=activated]', state: 'visible' } },
  { wait: 900 },
  // Back to the tool the toolbar started on, so every pass begins from the same state.
  { moveTo: '[data-part=tool-line]' },
  { wait: 1700 },
  { assert: { selector: '[data-part=tool-line][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=dwell][data-selected]', state: 'hidden' } },
  { wait: 900 },
]);
