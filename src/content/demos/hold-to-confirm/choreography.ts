import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=receipt]', state: 'hidden' } },
  { assert: { selector: '[data-part=hold][data-confirmed]', state: 'hidden' } },
  { moveTo: '[data-part=hold]' },
  { wait: 400 },
  // A press that lifts straight away is the gesture the guard is there to refuse.
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=readout][data-outcome=cancelled]', state: 'visible' } },
  { assert: { selector: '[data-part=receipt]', state: 'hidden' } },
  { wait: 900 },
  // A real hold that gives up early: the fill climbs a third of the way and the
  // guard refuses that too, which is the guard doing its job.
  { hold: 350 },
  { wait: 600 },
  { assert: { selector: '[data-part=readout][data-outcome=cancelled]', state: 'visible' } },
  { assert: { selector: '[data-part=receipt]', state: 'hidden' } },
  { wait: 900 },
  // Held past the threshold, the same press commits: no simulation, the script
  // presses the button the way a finger does and outlasts the guard.
  { hold: 1150 },
  { wait: 600 },
  { assert: { selector: '[data-part=hold][data-confirmed]', state: 'visible' } },
  { assert: { selector: '[data-part=receipt]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-outcome=confirmed]', state: 'visible' } },
  { wait: 1200 },
]);
