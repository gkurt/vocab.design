import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 400 },
  { assert: { selector: '[data-part=card]', state: 'hidden' } },
  { moveTo: '[data-part=send]' },
  { click: true },
  // Past the arrival, with room to spare: an assert is judged the moment it is
  // reached, so it is not timed to the edge of the transition.
  { wait: 700 },
  { assert: { selector: '[data-part=card]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=dismiss]' },
  { click: true },
  { wait: 300 },
  { assert: { selector: '[data-part=card]', state: 'hidden' } },
  { wait: 500 },
]);
