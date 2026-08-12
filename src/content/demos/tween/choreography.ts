import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 600 },
  { assert: { selector: '[data-part=tile]', state: 'visible' } },
  { moveTo: '[data-part=replay]' },
  { click: true },
  // Judged while the tile is still between the two stated values, which is the only
  // place the generated frames exist.
  { assert: { selector: '[data-part=panel][data-running]', state: 'visible' } },
  // Well past the 1.5s run, so the claim is about the value it lands on.
  { wait: 1900 },
  { assert: { selector: '[data-part=panel][data-settled]', state: 'visible' } },
  { assert: { selector: '[data-part=tile]', state: 'visible' } },
  { wait: 700 },
]);
