import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claims wait for the canvas to arrive.
  { wait: 550 },
  { assert: { selector: '[data-part=canvas][data-outcome=none]', state: 'visible' } },
  // An empty surface says nothing about the gesture unless it is told to.
  { assert: { selector: '[data-part=hint]', state: 'visible' } },
  { assert: { selector: '[data-part=drawn]', state: 'hidden' } },

  // A press that barely travels: the threshold reads it as a click, so nothing is made.
  { moveTo: '[data-part=start]' },
  { wait: 400 },
  { drag: { to: '[data-part=nudge]' } },
  { wait: 550 },
  { assert: { selector: '[data-part=canvas][data-outcome=tap]', state: 'visible' } },
  { assert: { selector: '[data-part=drawn]', state: 'hidden' } },

  // The whole gesture: the stroke both makes the frame and decides how big it is.
  { moveTo: '[data-part=start]' },
  { wait: 400 },
  { drag: { to: '[data-part=corner]' } },
  { wait: 650 },
  { assert: { selector: '[data-part=drawn][data-state=made]', state: 'visible' } },
  { assert: { selector: '[data-part=drawn][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=canvas][data-outcome=made]', state: 'visible' } },
  { assert: { selector: '[data-part=hint]', state: 'hidden' } },
  { wait: 1300 },
]);
