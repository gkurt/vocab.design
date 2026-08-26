import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claims wait for the grid to arrive.
  { wait: 550 },
  { assert: { selector: '[data-part=scheduler]', state: 'visible' } },
  // The all-day band and the current-time line are the two pieces the hours cannot hold.
  { assert: { selector: '[data-part=all-day]', state: 'visible' } },
  { assert: { selector: '[data-part=now]', state: 'visible' } },
  // Two events booked over each other, drawn side by side rather than one hiding the other.
  { assert: { selector: '[data-part=ev-standup]', state: 'visible' } },
  { assert: { selector: '[data-part=ev-interview]', state: 'visible' } },
  { assert: { selector: '[data-part=ev-deploy][data-slot="wed-1100"]', state: 'visible' } },

  // One block dragged across a day and down an hour: the slot it lands on is the new time.
  { moveTo: '[data-part=ev-deploy]' },
  { wait: 450 },
  { drag: { to: '[data-part=drop]' } },
  { wait: 600 },
  { assert: { selector: '[data-part=ev-deploy][data-slot="tue-1200"]', state: 'visible' } },
  { assert: { selector: '[data-part=grid][data-dragging=none]', state: 'visible' } },
  { wait: 1200 },
]);
