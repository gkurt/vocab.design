import { steps } from '#src/stage/choreography.ts';

// The pair mounts at the field's centre and only moves when a pointer does, so the script opens
// after the kit's fade and then simply walks the field. Each segment names a lag outright, so no
// step flips whatever it finds (SPEC §8).
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=field]', state: 'visible' } },
  { assert: { selector: '[data-part=ring][data-lag=loose]', state: 'visible' } },
  { assert: { selector: '[data-part=dot]', state: 'visible' } },

  // The swell: the ring grows while the pointer is over a link.
  { moveTo: '[data-part=link-a]' },
  { wait: 600 },
  { assert: { selector: '[data-part=ring][data-over]', state: 'visible' } },
  { moveTo: '[data-part=link-b]' },
  { wait: 600 },
  { assert: { selector: '[data-part=ring][data-over]', state: 'visible' } },

  // Plain copy: the ring goes back to its resting size.
  { moveTo: '[data-part=texture]' },
  { wait: 600 },
  { assert: { selector: '[data-part=ring]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },

  // The counter-example: no lag at all, so nothing trails.
  { moveTo: '[data-part=seg-instant]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=ring][data-lag=instant]', state: 'visible' } },
  { moveTo: '[data-part=link-c]' },
  { wait: 600 },
  { assert: { selector: '[data-part=ring][data-over]', state: 'visible' } },

  { moveTo: '[data-part=seg-tight]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=ring][data-lag=tight]', state: 'visible' } },
  { moveTo: '[data-part=link-d]' },
  { wait: 700 },
  { assert: { selector: '[data-part=ring][data-over]', state: 'visible' } },

  { moveTo: '[data-part=seg-loose]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=ring][data-lag=loose]', state: 'visible' } },
  { moveTo: '[data-part=link-a]' },
  { wait: 800 },
  { assert: { selector: '[data-part=ring][data-over]', state: 'visible' } },
  { wait: 600 },
]);
