import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 600 },
  { assert: { selector: '[data-part=marble-jank]', state: 'visible' } },
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
