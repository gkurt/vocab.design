import { steps } from '#src/stage/choreography.ts';

// The same two facts, once as surfaces the character owns and once as a flat overlay for
// the player. The pass ends in the diegetic state the demo mounts in (SPEC §8).
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=scene][data-mode=world]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { assert: { selector: '[data-part=wrist-figures]', state: 'visible' } },
  { assert: { selector: '[data-part=hud]', state: 'hidden' } },
  { wait: 1000 },

  { moveTo: '[data-part=seg-hud]' },
  { click: true },
  { wait: 600 },
  // Screen space: the numbers leave the world and the world stops carrying them.
  { assert: { selector: '[data-part=scene][data-mode=hud]', state: 'visible' } },
  { assert: { selector: '[data-part=hud-ammo]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'hidden' } },
  { assert: { selector: '[data-part=wrist-figures]', state: 'hidden' } },
  { wait: 1400 },

  { moveTo: '[data-part=seg-world]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=scene][data-mode=world]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { assert: { selector: '[data-part=hud]', state: 'hidden' } },
  { wait: 900 },
]);
