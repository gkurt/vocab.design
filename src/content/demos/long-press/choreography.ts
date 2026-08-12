import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=menu]', state: 'hidden' } },
  { assert: { selector: '[data-part=tile][data-held]', state: 'hidden' } },
  { moveTo: '[data-part=tile]' },
  { wait: 400 },
  // A press that lifts straight away is a tap, and the tile has to say so: this is the
  // gesture the hold is told apart from.
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=tile][data-tapped]', state: 'visible' } },
  { assert: { selector: '[data-part=menu]', state: 'hidden' } },
  { wait: 700 },
  // No step in the vocabulary holds a press, so the held state is reached through the
  // labelled simulation control, which runs the same countdown a finger does.
  { moveTo: '[data-part=sim]' },
  { wait: 300 },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=tile][data-held]', state: 'visible' } },
  { assert: { selector: '[data-part=menu]', state: 'visible' } },
  { wait: 900 },
  // Dismissal is explicit: a command runs and closes the actions itself.
  { moveTo: '[data-part=action-share]' },
  { wait: 300 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=menu]', state: 'hidden' } },
  { wait: 900 },
]);
