import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The mount's own pass is over: 700 ms of run plus a beat.
  { wait: 900 },
  { assert: { selector: '[data-part=scene][data-settled]', state: 'visible' } },
  { assert: { selector: '[data-part=card]', state: 'visible' } },
  { moveTo: '[data-part=replay]' },
  { click: true },
  // Claimed while the parts are still spread out: the lag only exists between the
  // body's departure and the badge's landing.
  { assert: { selector: '[data-part=scene][data-running]', state: 'visible' } },
  { assert: { selector: '[data-part=chip]', state: 'visible' } },
  { wait: 1100 },
  { assert: { selector: '[data-part=scene][data-settled]', state: 'visible' } },
  { assert: { selector: '[data-part=avatar]', state: 'visible' } },
  { wait: 600 },
]);
