import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Parked: on the page, beyond the viewport edge, and not open.
  { assert: { selector: '[data-part=panel]', state: 'visible' } },
  { assert: { selector: '[data-part=panel][data-open]', state: 'hidden' } },
  { assert: { selector: '[data-part=scrim][data-open]', state: 'hidden' } },
  { moveTo: '[data-part=trigger]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=panel][data-open]', state: 'visible' } },
  { assert: { selector: '[data-part=scrim][data-open]', state: 'visible' } },
  { assert: { selector: '[data-part=strip]', state: 'visible' } },
  { wait: 1300 },
  // Dismissal is its own control, never the trigger again.
  { moveTo: '[data-part=close]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=panel][data-open]', state: 'hidden' } },
  { assert: { selector: '[data-part=scrim][data-open]', state: 'hidden' } },
  // Still there, waiting outside the viewport: parked is not gone.
  { assert: { selector: '[data-part=panel]', state: 'visible' } },
  { wait: 800 },
]);
