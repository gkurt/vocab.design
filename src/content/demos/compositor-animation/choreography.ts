import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 600 },
  { assert: { selector: '[data-part=mover-gpu]', state: 'visible' } },
  // Replay names a run rather than toggling one, so a resumed pass lands where it said.
  { moveTo: '[data-part=replay]' },
  { click: true },
  { assert: { selector: '[data-part=scene][data-state=running]', state: 'visible' } },
  // The stall runs from 700 ms to 1700 ms into the trip; with the player's own post-click
  // beat this lands roughly halfway through it.
  { wait: 900 },
  { assert: { selector: '[data-part=scene][data-thread=busy]', state: 'visible' } },
  { assert: { selector: '[data-part=mover-main][data-state=stalled]', state: 'visible' } },
  { assert: { selector: '[data-part=mover-gpu][data-state=gliding]', state: 'visible' } },
  // Past the stall and still short of the landing, so the scripted mover is rolling again.
  { wait: 700 },
  { assert: { selector: '[data-part=mover-main][data-state=rolling]', state: 'visible' } },
  { wait: 1200 },
  { assert: { selector: '[data-part=mover-gpu][data-state=landed]', state: 'visible' } },
  { assert: { selector: '[data-part=scene][data-state=landed]', state: 'visible' } },
  { wait: 600 },
]);
