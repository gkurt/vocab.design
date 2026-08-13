import { steps } from '#src/stage/choreography.ts';

// The cursor goes where the offer sends it, then to the way out, and only then to the
// fair wording. The pass ends back on the state the demo mounts in, which is the one
// the subject's pose requires (SPEC §6, §8).
export default steps([
  { assert: { selector: '[data-part=decline][data-mode="shaming"]', state: 'visible' } },
  { assert: { selector: '[data-part=accept]', state: 'visible' } },
  { moveTo: '[data-part=accept]' },
  { wait: 700 },
  { moveTo: '[data-part=decline]' },
  { wait: 900 },
  { moveTo: '[data-part=mode-fair]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=decline][data-mode="fair"]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=mode-shaming]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=decline][data-mode="shaming"]', state: 'visible' } },
  { wait: 1000 },
]);
