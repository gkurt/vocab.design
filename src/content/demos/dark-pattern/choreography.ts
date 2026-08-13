import { steps } from '#src/stage/choreography.ts';

// The cursor goes where the design sends it (the glowing button), then hunts for the
// refusal, and only then reaches the fair state. Each state control reaches its own
// state rather than flipping the other's (SPEC §8).
export default steps([
  { assert: { selector: '[data-part=choice][data-mode="deceptive"]', state: 'visible' } },
  { assert: { selector: '[data-part=decline-quiet]', state: 'visible' } },
  { moveTo: '[data-part=accept]' },
  { wait: 600 },
  { moveTo: '[data-part=decline-quiet]' },
  { wait: 800 },
  { moveTo: '[data-part=mode-fair]' },
  { wait: 300 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=choice][data-mode="fair"]', state: 'visible' } },
  { assert: { selector: '[data-part=decline-fair]', state: 'visible' } },
  { assert: { selector: '[data-part=decline-quiet]', state: 'hidden' } },
  { wait: 1400 },
]);
