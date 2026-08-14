import { steps } from '#src/stage/choreography.ts';

// The sheet has an explicit trigger and two explicit ways out, so no step depends on
// the state it finds (SPEC §8). Nothing is ever typed: the whole sign-in is one
// gesture the device answers.
export default steps([
  { assert: { selector: '[data-part=signin-step]', state: 'visible' } },
  { assert: { selector: '[data-part=prompt]', state: 'hidden' } },
  { wait: 600 },
  { moveTo: '[data-part=use-passkey]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=prompt][data-open]', state: 'visible' } },
  { assert: { selector: '[data-part=prompt][data-state=asking]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=approve]' },
  { click: true },
  { wait: 300 },
  // The device signs, and the site never sees a secret to check.
  { assert: { selector: '[data-part=prompt][data-state=signing]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=done-step]', state: 'visible' } },
  { assert: { selector: '[data-part=signin-step]', state: 'hidden' } },
  { assert: { selector: '[data-part=prompt]', state: 'hidden' } },
  { wait: 1600 },
]);
