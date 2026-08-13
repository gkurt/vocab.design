import { steps } from '#src/stage/choreography.ts';

// The flow only ever moves forward, and each control reaches one state: Send opens the
// code step, Verify checks what is in the field (SPEC §8). The beat before the message
// lands is load-bearing, which is why an assert follows it rather than a bare wait.
export default steps([
  { assert: { selector: '[data-part=address-step]', state: 'visible' } },
  { assert: { selector: '[data-part=code-step]', state: 'hidden' } },
  { wait: 500 },
  { moveTo: '[data-part=send]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=code-step]', state: 'visible' } },
  { assert: { selector: '[data-part=address-step]', state: 'hidden' } },
  { assert: { selector: '[data-part=inbox]', state: 'hidden' } },
  { wait: 1200 },
  // The code arrives without the reader leaving the tab that is waiting for it.
  { assert: { selector: '[data-part=inbox]', state: 'visible' } },
  { wait: 500 },
  { moveTo: '[data-part=code]' },
  { click: true },
  { type: '481207' },
  { wait: 500 },
  { assert: { selector: '[data-part=code-step][data-filled]', state: 'visible' } },
  { wait: 400 },
  { moveTo: '[data-part=verify]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=code-step][data-state=verified]', state: 'visible' } },
  { wait: 1600 },
]);
