import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The kit surfaces fade in from mount, so nothing is judged at t=0.
  { wait: 600 },
  { assert: { selector: '[data-part=bar-long]', state: 'visible' } },
  { assert: { selector: '[data-part=stage][data-state=rest]', state: 'visible' } },
  { moveTo: '[data-part=replay]' },
  { click: true },
  // Judged a third of a second in, which is the whole point of the specimen: the
  // 150 ms lane has already landed while the 620 ms lane is still travelling.
  { assert: { selector: '[data-part=stage][data-state=running]', state: 'visible' } },
  { assert: { selector: '[data-part=lane-short][data-arrived]', state: 'visible' } },
  { assert: { selector: '[data-part=lane-long][data-arrived]', state: 'hidden' } },
  // The tail outlasts the longer run, so the loop's remount lands on a settled scene.
  { wait: 900 },
  { assert: { selector: '[data-part=lane-long][data-arrived]', state: 'visible' } },
  { assert: { selector: '[data-part=stage][data-state=done]', state: 'visible' } },
  { wait: 300 },
]);
