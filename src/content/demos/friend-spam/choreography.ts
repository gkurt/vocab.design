import { steps } from '#src/stage/choreography.ts';

// The same permission granted twice. The pass ends on the vague ask the demo mounts in,
// which is the state the subject's pose requires (SPEC §6, §8).
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=ask][data-mode=vague]', state: 'visible' } },
  { assert: { selector: '[data-part=outbox][data-state=pending]', state: 'visible' } },
  { wait: 600 },

  { moveTo: '[data-part=consent]' },
  { wait: 300 },
  { click: true },
  { wait: 600 },
  // Permission to look, spent on sending, in the reader's name.
  { assert: { selector: '[data-part=outbox][data-state=sent]', state: 'visible' } },
  { assert: { selector: '[data-part=ask][data-mode=vague]', state: 'visible' } },
  { wait: 1400 },

  { moveTo: '[data-part=mode-exact]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=ask][data-mode=exact]', state: 'visible' } },
  { assert: { selector: '[data-part=outbox][data-state=pending]', state: 'visible' } },
  { wait: 700 },

  { moveTo: '[data-part=consent]' },
  { wait: 300 },
  { click: true },
  { wait: 600 },
  // Same integration, same click: the address book is read and nothing is mailed.
  { assert: { selector: '[data-part=outbox][data-state=held]', state: 'visible' } },
  { wait: 1400 },

  { moveTo: '[data-part=mode-vague]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=ask][data-mode=vague]', state: 'visible' } },
  { assert: { selector: '[data-part=outbox][data-state=pending]', state: 'visible' } },
  { wait: 900 },
]);
