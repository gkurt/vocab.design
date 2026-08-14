import { steps } from '#src/stage/choreography.ts';

// The person goes first and passes without being asked anything. Then the form filler
// answers every input on the page, including the one it should never have been able to
// find, and the submission is dropped while the sender is told it worked. The pass ends
// with the trap empty again, which is the state the specimen mounts in.
export default steps([
  { assert: { selector: '[data-part=honeypot]', state: 'visible' } },
  { assert: { selector: '[data-part=result][data-state="idle"]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=as-person]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=result][data-state="accepted"]', state: 'visible' } },
  { assert: { selector: '[data-part=honeypot][data-filled]', state: 'hidden' } },
  { wait: 1200 },
  { moveTo: '[data-part=as-bot]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=result][data-state="rejected"]', state: 'visible' } },
  { assert: { selector: '[data-part=honeypot][data-filled]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=as-person]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=result][data-state="accepted"]', state: 'visible' } },
  { assert: { selector: '[data-part=honeypot][data-filled]', state: 'hidden' } },
  { wait: 900 },
]);
