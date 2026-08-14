import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The mount's own pass is over: 1400 ms of run plus a beat.
  { wait: 1700 },
  { assert: { selector: '[data-part=compare][data-settled]', state: 'visible' } },
  { assert: { selector: '[data-part=tile-under]', state: 'visible' } },
  { moveTo: '[data-part=replay]' },
  { click: true },
  // Claimed while all three are still on their way: the regimes only differ in flight.
  { assert: { selector: '[data-part=compare][data-running]', state: 'visible' } },
  { assert: { selector: '[data-part=tile-over]', state: 'visible' } },
  { wait: 1900 },
  { assert: { selector: '[data-part=compare][data-settled]', state: 'visible' } },
  { assert: { selector: '[data-part=tile-critical]', state: 'visible' } },
  { wait: 600 },
]);
