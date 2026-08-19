import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=canvas][data-gesture=rest]', state: 'visible' } },
  { assert: { selector: '[data-part=canvas][data-angle="0"]', state: 'visible' } },
  // The pair twists clockwise: the photo turns with the segment between the contacts.
  { moveTo: '[data-part=canvas]' },
  { wait: 350 },
  { pinch: { turn: 15, ms: 1000 } },
  { wait: 500 },
  { assert: { selector: '[data-part=canvas][data-gesture=turned]', state: 'visible' } },
  { assert: { selector: '[data-part=canvas][data-angle="15"]', state: 'visible' } },
  { wait: 900 },
  // Back through level the other way: the detent sticks at zero on the way past,
  // and the turn lands at 15 minus 25.
  { pinch: { turn: -25, ms: 1100 } },
  { wait: 500 },
  { assert: { selector: '[data-part=canvas][data-gesture=turned]', state: 'visible' } },
  { assert: { selector: '[data-part=canvas][data-angle="-10"]', state: 'visible' } },
  { wait: 1200 },
]);
