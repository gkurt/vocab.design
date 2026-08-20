import { steps } from '#src/stage/choreography.ts';

// The walk is timed on the stage's clock, so every assert is aimed at the middle of a
// stage's window rather than at its edge (SPEC §8): sending holds 900 ms, sent 1300,
// delivered 1600, and read is where it rests.
export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=marker][data-state=sent]', state: 'visible' } },
  { moveTo: '[data-part=send]' },
  { wait: 350 },
  { click: true },
  { wait: 200 },
  { assert: { selector: '[data-part=marker][data-state=sending]', state: 'visible' } },
  { wait: 900 },
  // One tick: it left this phone, and that is the whole claim.
  { assert: { selector: '[data-part=marker][data-state=sent]', state: 'visible' } },
  { assert: { selector: '[data-part=tick-single]', state: 'visible' } },
  { assert: { selector: '[data-part=tick-double]', state: 'hidden' } },
  { wait: 1500 },
  { assert: { selector: '[data-part=marker][data-state=delivered]', state: 'visible' } },
  { assert: { selector: '[data-part=tick-double]', state: 'visible' } },
  { assert: { selector: '[data-part=marker-time]', state: 'hidden' } },
  { wait: 1400 },
  // The last stage is the only one that names a person rather than a device.
  { assert: { selector: '[data-part=marker][data-state=read]', state: 'visible' } },
  { assert: { selector: '[data-part=marker-time]', state: 'visible' } },
  { wait: 1600 },
]);
