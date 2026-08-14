import { steps } from '#src/stage/choreography.ts';

// The flow only moves forward, and every control reaches one state: Send opens the
// waiting screen, the link spends itself and lands signed in (SPEC §8). The beat
// before the message arrives is load-bearing, so an assert follows it rather than a
// bare wait, which is also what lets identify summon the link.
export default steps([
  { assert: { selector: '[data-part=email-step]', state: 'visible' } },
  { assert: { selector: '[data-part=message]', state: 'hidden' } },
  { wait: 500 },
  { moveTo: '[data-part=send]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=wait-step]', state: 'visible' } },
  { assert: { selector: '[data-part=email-step]', state: 'hidden' } },
  { assert: { selector: '[data-part=message]', state: 'hidden' } },
  { wait: 1300 },
  // The proof arrives in the mailbox, and it is a link rather than something to retype.
  { assert: { selector: '[data-part=message]', state: 'visible' } },
  { assert: { selector: '[data-part=link]', state: 'visible' } },
  { wait: 600 },
  { moveTo: '[data-part=link]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=done-step]', state: 'visible' } },
  { assert: { selector: '[data-part=wait-step]', state: 'hidden' } },
  // Single use: the same link is no longer an entrance.
  { assert: { selector: '[data-part=link][aria-disabled="true"]', state: 'visible' } },
  { wait: 1600 },
]);
