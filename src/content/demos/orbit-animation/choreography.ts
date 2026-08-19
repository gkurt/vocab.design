import { steps } from '#src/stage/choreography.ts';

// The revolving never stops, so the script's work is to prove the period is the one that was
// asked for and that the drawn paths and the hub are still where they were. Each segment names
// a period outright, so no step flips whatever it found (SPEC §8). The opening wait is the
// kit's mount fade.
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=satellite][data-speed=steady]', state: 'visible' } },
  { assert: { selector: '[data-part=path-outer]', state: 'visible' } },
  { assert: { selector: '[data-part=hub]', state: 'visible' } },

  { moveTo: '[data-part=seg-slow]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=satellite][data-speed=slow]', state: 'visible' } },
  { assert: { selector: '[data-part=moon]', state: 'visible' } },

  { moveTo: '[data-part=seg-quick]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=satellite][data-speed=quick]', state: 'visible' } },
  { assert: { selector: '[data-part=note]', state: 'visible' } },

  { moveTo: '[data-part=seg-steady]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=satellite][data-speed=steady]', state: 'visible' } },
  { assert: { selector: '[data-part=path-inner]', state: 'visible' } },
  { wait: 700 },
]);
