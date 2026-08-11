import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=badge-bounce]', state: 'visible' } },
  { assert: { selector: '[data-part=badge-plain]', state: 'visible' } },
  { moveTo: '[data-part=replay]' },
  { click: true },
  // Claimed while the badge is still coming off the floor: the rebounds only exist
  // between the drop and the rest, so a finished run would prove nothing.
  { assert: { selector: '[data-part=panel][data-running]', state: 'visible' } },
  // Well past the last landing, so nothing here sits on the edge of a frame.
  { wait: 1900 },
  { assert: { selector: '[data-part=panel][data-settled]', state: 'visible' } },
  { assert: { selector: '[data-part=badge-bounce]', state: 'visible' } },
  { wait: 800 },
]);
