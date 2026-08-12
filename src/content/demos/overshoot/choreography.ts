import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=sheet-over]', state: 'visible' } },
  { assert: { selector: '[data-part=sheet-plain]', state: 'visible' } },
  { moveTo: '[data-part=replay]' },
  { click: true },
  // Claimed while the sheet is still correcting: the surplus only exists between the
  // first crossing and the rest, so a finished run would prove nothing.
  { assert: { selector: '[data-part=panel][data-running]', state: 'visible' } },
  // Well past the 900ms run and its corrections.
  { wait: 1400 },
  { assert: { selector: '[data-part=panel][data-settled]', state: 'visible' } },
  { assert: { selector: '[data-part=sheet-over]', state: 'visible' } },
  { wait: 700 },
]);
