import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claims wait for the scene to arrive.
  { wait: 600 },
  // The session the specimen mounts with already holds one burst, and that band is the subject.
  { assert: { selector: '[data-part=burst-past]', state: 'visible' } },
  { assert: { selector: '[data-part=timeline][data-detect=idle]', state: 'visible' } },
  { assert: { selector: '[data-part=burst-live]', state: 'hidden' } },

  { moveTo: '[data-part=export]' },
  { wait: 500 },
  // Three presses, 350 ms apart. Counted, and still short of this demo's threshold of four.
  { click: true },
  { click: true },
  { click: true },
  { assert: { selector: '[data-part=timeline][data-detect=counting]', state: 'visible' } },
  { assert: { selector: '[data-part=burst-live]', state: 'hidden' } },

  // The fourth press crosses the threshold inside the window; the fifth widens the band.
  { click: true },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=timeline][data-detect=burst]', state: 'visible' } },
  { assert: { selector: '[data-part=burst-live]', state: 'visible' } },
  // Nothing on the button changed at any point, and the earlier burst is still on the record.
  { assert: { selector: '[data-part=burst-past]', state: 'visible' } },

  // Past the window: the detector goes quiet again, and the band it drew stays.
  { wait: 1600 },
  { assert: { selector: '[data-part=timeline][data-detect=idle]', state: 'visible' } },
  { assert: { selector: '[data-part=burst-live]', state: 'visible' } },
  { wait: 1200 },
]);
