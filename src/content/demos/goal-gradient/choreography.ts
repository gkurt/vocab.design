import { steps } from '#src/stage/choreography.ts';

// Three absolute distances from the same goal, in order, and the proof is that the
// treatment moves with the distance: the read-out's tone and the track's stage are read
// together at each stop. The pass returns to the state the specimen mounts in (SPEC §8).
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=track][data-stage=far]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-tone=quiet]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=pick-mid]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=track][data-stage=mid]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-tone=close]', state: 'visible' } },
  { assert: { selector: '[data-part=fill]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=pick-near]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=track][data-stage=near]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-tone=final]', state: 'visible' } },
  { assert: { selector: '[data-part=goal]', state: 'visible' } },
  { wait: 1600 },
  { moveTo: '[data-part=pick-far]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=track][data-stage=far]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-tone=quiet]', state: 'visible' } },
  { wait: 900 },
]);
