import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=send]', state: 'visible' } },
  { moveTo: '[data-part=send]' },
  { click: true },
  // Claimed while the glyph is still winding up or in flight: the whole gesture is
  // 780ms and this lands well inside it.
  { assert: { selector: '[data-part=panel][data-running]', state: 'visible' } },
  // Past the end of the run, where the glyph is back at rest.
  { wait: 1100 },
  { assert: { selector: '[data-part=panel][data-settled]', state: 'visible' } },
  { assert: { selector: '[data-part=send-glyph]', state: 'visible' } },
  { moveTo: '[data-part=cold]' },
  { click: true },
  { wait: 1100 },
  { assert: { selector: '[data-part=panel][data-settled]', state: 'visible' } },
  { wait: 600 },
]);
