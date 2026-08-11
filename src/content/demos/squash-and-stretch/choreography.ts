import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=ball-soft]', state: 'visible' } },
  { assert: { selector: '[data-part=ball-rigid]', state: 'visible' } },
  { moveTo: '[data-part=replay]' },
  { click: true },
  // Claimed while the balls are still in the air: the deformation only exists between
  // the drop and the rest, so a run that has already finished proves nothing.
  { assert: { selector: '[data-part=panel][data-running]', state: 'visible' } },
  // Well past the second bounce, so nothing here lands on the edge of a frame.
  { wait: 2100 },
  { assert: { selector: '[data-part=panel][data-settled]', state: 'visible' } },
  { assert: { selector: '[data-part=ball-soft]', state: 'visible' } },
  { wait: 800 },
]);
