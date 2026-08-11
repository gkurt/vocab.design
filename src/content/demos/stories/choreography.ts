import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=bar-1][data-current]', state: 'visible' } },
  { moveTo: '[data-part=next]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=bar-2][data-current]', state: 'visible' } },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=bar-3][data-current]', state: 'visible' } },
  { assert: { selector: '[data-part=bar-1][data-seen]', state: 'visible' } },
  { moveTo: '[data-part=run-paused]' },
  { click: true },
  // Longer than one dwell: an unpaused run would already be on the last card.
  { wait: 3200 },
  { assert: { selector: '[data-part=bar-3][data-current]', state: 'visible' } },
  { assert: { selector: '[data-part=bar-4][data-current]', state: 'hidden' } },
  { moveTo: '[data-part=run-playing]' },
  { click: true },
  { wait: 3000 },
  { assert: { selector: '[data-part=bar-4][data-current]', state: 'visible' } },
  { wait: 900 },
]);
