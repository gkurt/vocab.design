import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The mount's own pass is over: 900 ms of ruler plus a beat.
  { wait: 1200 },
  { assert: { selector: '[data-part=compare][data-state=settled]', state: 'visible' } },
  { assert: { selector: '[data-part=flag]', state: 'visible' } },
  { moveTo: '[data-part=replay]' },
  { click: true },
  // Judged the instant the run starts: the tween has not spent its 400 ms yet.
  { assert: { selector: '[data-part=compare][data-state=running]', state: 'visible' } },
  // The quotable window opens at the measured settle (~460 ms in) and closes when the
  // ruler ends (960 ms). With the player's own post-click beat this lands mid-window.
  { wait: 400 },
  { assert: { selector: '[data-part=compare][data-state=quotable]', state: 'visible' } },
  { wait: 700 },
  { assert: { selector: '[data-part=compare][data-state=settled]', state: 'visible' } },
  { assert: { selector: '[data-part=tile-spring]', state: 'visible' } },
  { wait: 600 },
]);
