import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 1400 },
  { assert: { selector: '[data-part=scene][data-state=landed]', state: 'visible' } },
  { assert: { selector: '[data-part=lane-arc]', state: 'visible' } },
  // Replay names a run rather than toggling one, so a resumed pass lands where it said.
  { moveTo: '[data-part=replay]' },
  { click: true },
  // The trip is 900 ms after a 70 ms lead, so the post-click beat lands well inside it.
  { assert: { selector: '[data-part=scene][data-state=travelling]', state: 'visible' } },
  { wait: 1200 },
  { assert: { selector: '[data-part=scene][data-state=landed]', state: 'visible' } },
  { assert: { selector: '[data-part=card-arc-x]', state: 'visible' } },
  { assert: { selector: '[data-part=card-line]', state: 'visible' } },
  { wait: 700 },
]);
