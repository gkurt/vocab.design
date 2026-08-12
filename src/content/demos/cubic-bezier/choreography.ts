import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 600 },
  { assert: { selector: '[data-part=diagram]', state: 'visible' } },
  { assert: { selector: '[data-part=dot-curve]', state: 'visible' } },
  // Past the mount pass, so the replay is a run of its own rather than the tail of one.
  { wait: 900 },
  { moveTo: '[data-part=replay]' },
  { click: true },
  // Claimed while the dots are still travelling: the difference between the two
  // timings only exists between the start and the arrival.
  { assert: { selector: '[data-part=race][data-running]', state: 'visible' } },
  // Well past the 1.1s travel, so nothing here sits on the edge of a frame.
  { wait: 1500 },
  { assert: { selector: '[data-part=race][data-settled]', state: 'visible' } },
  { assert: { selector: '[data-part=dot-linear]', state: 'visible' } },
  { wait: 600 },
]);
