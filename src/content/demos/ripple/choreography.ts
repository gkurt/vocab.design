import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=surface]', state: 'visible' } },
  { moveTo: '[data-part=spot-left]' },
  { click: true },
  // Judged while the wash is still travelling: the ripple only exists between the
  // press and the fade, so a finished run would prove nothing.
  { assert: { selector: '[data-part=surface][data-rippling]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-origin=left]', state: 'visible' } },
  // Well past the 520ms fade, so the claim is about the state the control lands in.
  { wait: 800 },
  { assert: { selector: '[data-part=surface][data-rippling]', state: 'hidden' } },
  { moveTo: '[data-part=spot-right]' },
  { click: true },
  // The same control, a different origin: the second press is the whole point.
  { assert: { selector: '[data-part=readout][data-origin=right]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=surface][data-rippling]', state: 'hidden' } },
]);
