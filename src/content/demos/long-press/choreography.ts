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
  // A real press that gives up early: the ring climbs most of the way and the lift is
  // still read as a tap, which is where the threshold lives.
  { hold: 320 },
  { wait: 500 },
  { assert: { selector: '[data-part=tile][data-tapped]', state: 'visible' } },
  { assert: { selector: '[data-part=menu]', state: 'hidden' } },
  { wait: 700 },
  // Held past the threshold, the same press opens the actions: the script presses the
  // tile the way a finger does rather than standing in for it.
  { hold: 750 },
  { wait: 600 },
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
