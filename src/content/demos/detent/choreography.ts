import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claims wait for the rail to arrive.
  { wait: 500 },
  { assert: { selector: '[data-part=scene][data-detent="0"]', state: 'visible' } },
  // The wells are drawn at rest, which is what lets the pin ring one of them at any moment.
  { assert: { selector: '[data-part=well-2]', state: 'visible' } },

  // One stroke across the rail. `data-caught=many` is the part no state after the release
  // could show: the needle was taken hold of by well after well while the button was down.
  { moveTo: '[data-part=thumb]' },
  { wait: 450 },
  { drag: { to: '[data-part=well-3]', via: ['[data-part=well-1]', '[data-part=well-2]'] } },
  { wait: 500 },
  { assert: { selector: '[data-part=scene][data-caught=many]', state: 'visible' } },
  { assert: { selector: '[data-part=scene][data-detent="3"]', state: 'visible' } },
  { assert: { selector: '[data-part=scene][data-settle=landed]', state: 'visible' } },
  { wait: 1000 },

  // The other half of the rule, and the half that is not snapping: a stroke let go
  // between two wells is pulled onto the nearer one, so no value off a well can be left.
  { moveTo: '[data-part=thumb]' },
  { wait: 400 },
  { drag: { to: '[data-part=between]' } },
  { wait: 500 },
  { assert: { selector: '[data-part=scene][data-settle=pulled]', state: 'visible' } },
  { assert: { selector: '[data-part=scene][data-detent="2"]', state: 'visible' } },
  { wait: 1100 },
]);
