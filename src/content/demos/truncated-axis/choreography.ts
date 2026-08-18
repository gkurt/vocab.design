import { steps } from '#src/stage/choreography.ts';

// The same four bars against two named domains, in order, and the proof is that the axis
// and the read-out move together: the cut axis is read with its fivefold claim, the zero
// axis with its 1.03 one. The pass returns to the state the specimen mounts in (SPEC §8).
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=axis][data-mode=truncated]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-mode=truncated]', state: 'visible' } },
  { assert: { selector: '[data-part=bar-q4]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=domain-zero]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=axis][data-mode=zero]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-mode=zero]', state: 'visible' } },
  { assert: { selector: '[data-part=bar-q1]', state: 'visible' } },
  { wait: 1600 },
  { moveTo: '[data-part=domain-truncated]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=axis][data-mode=truncated]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-mode=truncated]', state: 'visible' } },
  { wait: 900 },
]);
