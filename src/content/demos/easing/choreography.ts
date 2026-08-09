import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 1600 },
  { assert: { selector: '[data-part=dot-linear]', state: 'visible' } },
  { assert: { selector: '[data-part=dot-overshoot]', state: 'visible' } },
  { moveTo: '[data-part=play]' },
  { click: true },
  { assert: { selector: '[data-part=stage][data-running]', state: 'visible' } },
  { wait: 2200 },
]);
