import { steps } from '#src/stage/choreography.ts';

// One stop, then it is gone. Got it always clears the announcement and New teammate
// always raises it, so neither control flips the state it happens to find (SPEC §8).
export default steps([
  { assert: { selector: '[data-part=bubble]', state: 'visible' } },
  { assert: { selector: '[data-part=spot]', state: 'visible' } },
  { assert: { selector: '[data-part=new-dot]', state: 'visible' } },
  { assert: { selector: '[data-part=frame][data-seen]', state: 'hidden' } },
  { wait: 1100 },
  { moveTo: '[data-part=ack]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=bubble]', state: 'hidden' } },
  { assert: { selector: '[data-part=spot]', state: 'hidden' } },
  { assert: { selector: '[data-part=new-dot]', state: 'hidden' } },
  { assert: { selector: '[data-part=frame][data-seen]', state: 'visible' } },
  { wait: 700 },
  // The control it pointed at was never blocked, and it still does what it said.
  { moveTo: '[data-part=app-export]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=status][data-done]', state: 'visible' } },
  { wait: 800 },
  // It only comes back for somebody who has not seen it.
  { moveTo: '[data-part=replay]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=bubble]', state: 'visible' } },
  { assert: { selector: '[data-part=frame][data-seen]', state: 'hidden' } },
  { wait: 1400 },
]);
