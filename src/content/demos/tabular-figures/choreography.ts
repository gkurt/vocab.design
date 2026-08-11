import { steps } from '#src/stage/choreography.ts';

// The ledger re-totals every 1400ms, so each frame is claimed at its midpoint:
// 700ms of room on either side, never at the edge where a beat changes hands.
export default steps([
  { assert: { selector: '[data-part=col-prop]', state: 'visible' } },
  { assert: { selector: '[data-part=col-tab]', state: 'visible' } },
  { wait: 700 },
  { assert: { selector: '[data-part=col-tab][data-frame=a]', state: 'visible' } },
  { wait: 1400 },
  { assert: { selector: '[data-part=col-tab][data-frame=b]', state: 'visible' } },
  { assert: { selector: '[data-part=col-prop][data-frame=b]', state: 'visible' } },
  { wait: 1400 },
  { assert: { selector: '[data-part=col-tab][data-frame=c]', state: 'visible' } },
  { wait: 1400 },
  { assert: { selector: '[data-part=col-tab][data-frame=a]', state: 'visible' } },
  { wait: 700 },
]);
