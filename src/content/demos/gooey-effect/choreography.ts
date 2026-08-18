import { steps } from '#src/stage/choreography.ts';

// The group rests touching at mount, so the script opens after the kit's fade. Each segment names a
// spacing outright, so no step flips whatever it finds (SPEC §8). The move runs 620 ms, so the beat
// after a click lands inside it.
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=scene][data-gap=touching][data-state=rested]', state: 'visible' } },
  { assert: { selector: '[data-part=blob]', state: 'visible' } },
  { assert: { selector: '[data-part=blob-2]', state: 'visible' } },

  // Far enough apart and each falloff dies before it reaches the next one.
  { moveTo: '[data-part=seg-apart]' },
  { click: true },
  { assert: { selector: '[data-part=scene][data-state=moving]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=scene][data-gap=apart][data-state=rested]', state: 'visible' } },
  { assert: { selector: '[data-part=blob-1]', state: 'visible' } },

  { moveTo: '[data-part=seg-touching]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=scene][data-gap=touching][data-state=rested]', state: 'visible' } },
  { assert: { selector: '[data-part=claim]', state: 'visible' } },

  { moveTo: '[data-part=seg-merged]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=scene][data-gap=merged][data-state=rested]', state: 'visible' } },
  { assert: { selector: '[data-part=blob]', state: 'visible' } },

  { moveTo: '[data-part=seg-touching]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=scene][data-gap=touching][data-state=rested]', state: 'visible' } },
  { wait: 700 },
]);
