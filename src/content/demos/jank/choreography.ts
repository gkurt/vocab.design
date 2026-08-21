import { steps } from '#src/stage/choreography.ts';

// Both marbles run once at mount: 70 ms of lead and 1600 ms of travel. The opening wait
// outlasts that, so Replay is pressed with both marbles landed and neither is snatched back
// to the start mid-roll (SPEC §8).
export default steps([
  { wait: 2100 },
  { assert: { selector: '[data-part=marble-jank][data-state=landed]', state: 'visible' } },
  // Replay names a run rather than toggling one, so a resumed pass lands where it said.
  { moveTo: '[data-part=replay]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=marble-jank][data-state=rolling]', state: 'visible' } },
  { wait: 1700 },
  { assert: { selector: '[data-part=marble-jank][data-state=landed]', state: 'visible' } },
  // Three frames arrived late enough to be seen as a hold, and both marbles still landed together.
  { assert: { selector: '[data-part=holds][data-count="3"]', state: 'visible' } },
  { wait: 600 },
]);
