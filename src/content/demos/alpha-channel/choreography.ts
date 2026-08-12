import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The chip is already translucent at rest, so the pose shows the term.
  { assert: { selector: '[data-part=chip][data-alpha="64"]', state: 'visible' } },
  { wait: 800 },
  // Every drag ends on a tick, so it reaches a stated alpha rather than nudging the last one.
  { moveTo: '[data-part=thumb]' },
  { drag: { to: '[data-part=tick-100]' } },
  { assert: { selector: '[data-part=chip][data-alpha="100"]', state: 'visible' } },
  { wait: 1100 },
  { moveTo: '[data-part=thumb]' },
  { drag: { to: '[data-part=tick-32]' } },
  { assert: { selector: '[data-part=chip][data-alpha="32"]', state: 'visible' } },
  { wait: 1100 },
  { moveTo: '[data-part=thumb]' },
  { drag: { to: '[data-part=tick-12]' } },
  { assert: { selector: '[data-part=chip][data-alpha="12"]', state: 'visible' } },
  { wait: 1100 },
  { moveTo: '[data-part=thumb]' },
  { drag: { to: '[data-part=tick-64]' } },
  { assert: { selector: '[data-part=chip][data-alpha="64"]', state: 'visible' } },
  { wait: 1000 },
]);
