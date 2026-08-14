import { steps } from '#src/stage/choreography.ts';

// The beacon only opens and Got it only dismisses, so no step depends on the state it
// finds (SPEC §8). Re-arming is the specimen's own instrumentation.
export default steps([
  { assert: { selector: '[data-part=beacon]', state: 'visible' } },
  { assert: { selector: '[data-part=callout]', state: 'hidden' } },
  { wait: 800 },
  { moveTo: '[data-part=beacon]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=callout]', state: 'visible' } },
  // The interface it points at is never dimmed and never blocked.
  { assert: { selector: '[data-part=anchor]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=ack]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=callout]', state: 'hidden' } },
  { assert: { selector: '[data-part=beacon]', state: 'hidden' } },
  { wait: 900 },
  { moveTo: '[data-part=rearm]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=beacon]', state: 'visible' } },
  { assert: { selector: '[data-part=callout]', state: 'hidden' } },
  { wait: 800 },
]);
