import { steps } from '#src/stage/choreography.ts';

// The drift starts at mount and runs 4800 ms, so the opening wait carries it all the way to
// its own rest: Replay is pressed on a settled framing rather than snapping the plate back
// while the reader is still watching it move (SPEC §8).
export default steps([
  { wait: 5100 },
  { assert: { selector: '[data-part=scene][data-state=rested]', state: 'visible' } },
  { assert: { selector: '[data-part=photo]', state: 'visible' } },
  // Replay names a drift rather than toggling one, so a resumed pass lands where it said.
  { moveTo: '[data-part=replay]' },
  { click: true },
  // The drift is nearly five seconds long, so the post-click beat lands well inside it.
  { assert: { selector: '[data-part=scene][data-state=drifting]', state: 'visible' } },
  { wait: 5200 },
  { assert: { selector: '[data-part=scene][data-state=rested]', state: 'visible' } },
  { assert: { selector: '[data-part=photo]', state: 'visible' } },
  { wait: 600 },
]);
