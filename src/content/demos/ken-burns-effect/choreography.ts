import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 700 },
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
