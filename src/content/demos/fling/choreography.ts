import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to arrive.
  { wait: 500 },
  { assert: { selector: '[data-part=surface][data-carry=idle]', state: 'visible' } },
  // A drag that comes to a stop before it lets go. The player holds still before releasing,
  // which is exactly the contact this term is not about, so the list stops where the hand did.
  { moveTo: '[data-part=grip]' },
  { wait: 500 },
  { drag: { to: '[data-part=grip-end]' } },
  { wait: 400 },
  { assert: { selector: '[data-part=surface][data-carry=none]', state: 'visible' } },
  { wait: 900 },
  // Back to the top, so the throw is measured from the same place every pass.
  { moveTo: '[data-part=reset]' },
  { wait: 400 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=surface][data-carry=idle]', state: 'visible' } },
  { wait: 500 },
  // The throw itself: released mid-motion, so the surface spends the velocity on its own.
  { moveTo: '[data-part=sim-fling]' },
  { wait: 400 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=surface][data-carry=coasting]', state: 'visible' } },
  { wait: 1600 },
  { assert: { selector: '[data-part=surface][data-carry=settled]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=reset]' },
  { wait: 400 },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=surface][data-carry=idle]', state: 'visible' } },
  { wait: 800 },
]);
