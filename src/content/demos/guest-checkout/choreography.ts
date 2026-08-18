import { steps } from '#src/stage/choreography.ts';

// The same control is followed through both layouts. In the balanced state it is a button
// sitting level with Sign in; in the account-first state it is still present and has become
// small print under a form. Each segment reaches an absolute state, so no step here flips
// what it finds (SPEC §8), and the pass ends on the state the specimen mounts in.
export default steps([
  { wait: 600 },
  { assert: { selector: '[data-part=guest][data-mode=balanced]', state: 'visible' } },
  { assert: { selector: '[data-part=signin]', state: 'visible' } },
  { moveTo: '[data-part=guest]' },
  { wait: 900 },
  { assert: { selector: '[data-part=guest][data-mode=balanced]', state: 'visible' } },
  { moveTo: '[data-part=mode-account]' },
  { wait: 300 },
  { click: true },
  { wait: 700 },
  // Still there, still clickable, and no longer an equal path.
  { assert: { selector: '[data-part=guest][data-mode=account]', state: 'visible' } },
  { assert: { selector: '[data-part=create]', state: 'visible' } },
  { assert: { selector: '[data-part=signin]', state: 'hidden' } },
  { wait: 1600 },
  { moveTo: '[data-part=mode-balanced]' },
  { wait: 300 },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=guest][data-mode=balanced]', state: 'visible' } },
  { assert: { selector: '[data-part=signin]', state: 'visible' } },
  { assert: { selector: '[data-part=create]', state: 'hidden' } },
  { wait: 1000 },
]);
