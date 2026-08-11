import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=tile]', state: 'visible' } },
  { moveTo: '[data-part=replay]' },
  { click: true },
  // Claimed while the tile is still between pins: the interpolation only exists
  // between the first stop and the last.
  { assert: { selector: '[data-part=panel][data-running]', state: 'visible' } },
  // Well past the final stop, so nothing here lands on the edge of a frame.
  { wait: 2300 },
  { assert: { selector: '[data-part=panel][data-settled]', state: 'visible' } },
  { assert: { selector: '[data-part=tile]', state: 'visible' } },
  { wait: 800 },
]);
