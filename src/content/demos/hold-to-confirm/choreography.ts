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
  // No step in the vocabulary holds a press, so the committed state is reached through
  // the labelled simulation control, which runs the same countdown a finger does.
  { moveTo: '[data-part=sim]' },
  { wait: 400 },
  { click: true },
  { wait: 1400 },
  { assert: { selector: '[data-part=hold][data-confirmed]', state: 'visible' } },
  { assert: { selector: '[data-part=receipt]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-outcome=confirmed]', state: 'visible' } },
  { wait: 1200 },
]);
