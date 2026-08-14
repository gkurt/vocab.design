import { steps } from '#src/stage/choreography.ts';

// The cursor goes where the drawing sends it first, then has to travel to the refusal,
// which is the whole demonstration. Only then does the balanced version get its turn.
// The pass ends on the mount state, which the subject's pose requires (SPEC §6, §8).
export default steps([
  { assert: { selector: '[data-part=choice][data-mode="steered"]', state: 'visible' } },
  { assert: { selector: '[data-part=decline]', state: 'visible' } },
  { moveTo: '[data-part=accept]' },
  { wait: 900 },
  { moveTo: '[data-part=decline]' },
  { wait: 1100 },
  { moveTo: '[data-part=mode-fair]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=choice][data-mode="fair"]', state: 'visible' } },
  { assert: { selector: '[data-part=decline]', state: 'visible' } },
  { wait: 400 },
  { moveTo: '[data-part=decline]' },
  { wait: 1100 },
  { moveTo: '[data-part=mode-steered]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=choice][data-mode="steered"]', state: 'visible' } },
  { wait: 800 },
]);
