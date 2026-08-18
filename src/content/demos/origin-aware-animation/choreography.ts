import { steps } from '#src/stage/choreography.ts';

// The panel opens from the first trigger at mount, so the script waits out the kit's fade and the
// 340 ms entrance before judging anything. Each trigger reaches "open, from here" and Close reaches
// the shut state, so no step flips whatever it finds (SPEC §8).
export default steps([
  { wait: 900 },
  { assert: { selector: '[data-part=scene][data-anchor=a][data-state=open]', state: 'visible' } },
  { assert: { selector: '[data-part=panel]', state: 'visible' } },
  { assert: { selector: '[data-part=origin]', state: 'visible' } },

  // Dismissal is explicit, never a second press on the trigger.
  { moveTo: '[data-part=close]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=panel]', state: 'hidden' } },

  // The same panel, grown out of the far corner instead.
  { moveTo: '[data-part=trig-c]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=scene][data-anchor=c][data-state=open]', state: 'visible' } },
  { assert: { selector: '[data-part=panel][data-origin=trigger]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },

  { moveTo: '[data-part=trig-b]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=scene][data-anchor=b][data-state=open]', state: 'visible' } },

  // The counter-example: the same entrance, blooming out of the panel's own middle.
  { moveTo: '[data-part=seg-centre]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=panel][data-origin=centre]', state: 'visible' } },

  { moveTo: '[data-part=seg-trigger]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=panel][data-origin=trigger]', state: 'visible' } },

  { moveTo: '[data-part=trig-a]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=scene][data-anchor=a][data-state=open]', state: 'visible' } },
  { wait: 700 },
]);
