import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=group]', state: 'visible' } },
  { assert: { selector: '[data-part=group][data-sim-focus]', state: 'hidden' } },
  // Pressing the unit is pressing the control: the ring lands on the whole group.
  { moveTo: '[data-part=suffix]' },
  { wait: 300 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=group][data-sim-focus]', state: 'visible' } },
  { moveTo: '[data-part=amount]' },
  { wait: 300 },
  { click: true },
  { type: '250' },
  { wait: 500 },
  { assert: { selector: '[data-part=amount][data-filled]', state: 'visible' } },
  { assert: { selector: '[data-part=group][data-sim-focus]', state: 'visible' } },
  { wait: 900 },
  // Leaving the group is its own step, never a flip of whatever was found (SPEC §8).
  { moveTo: '[data-part=aside]' },
  { wait: 300 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=group][data-sim-focus]', state: 'hidden' } },
  { moveTo: '[data-part=search-go]' },
  { wait: 800 },
  { assert: { selector: '[data-part=search]', state: 'visible' } },
  { wait: 600 },
]);
