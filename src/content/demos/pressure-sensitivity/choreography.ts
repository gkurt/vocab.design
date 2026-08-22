import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to arrive.
  { wait: 500 },
  { assert: { selector: '[data-part=stroke][data-level=medium]', state: 'visible' } },
  { wait: 600 },
  // The fingertip lands on the paper. Depth comes from the length of the press, so a
  // brief hold reads light and draws a thin line the whole way across.
  { moveTo: '[data-part=paper]' },
  { wait: 400 },
  { hold: 160 },
  { wait: 700 },
  { assert: { selector: '[data-part=stroke][data-level=light]', state: 'visible' } },
  { wait: 900 },
  // A press held to the end of the axis: the swell through the middle of the gesture is
  // the pressure curve made visible, and the ink keeps what the press reached.
  { hold: 900 },
  { wait: 700 },
  { assert: { selector: '[data-part=stroke][data-level=firm]', state: 'visible' } },
  { wait: 1000 },
  // Back to the middle of the axis, which is where the paper was found.
  { hold: 450 },
  { wait: 700 },
  { assert: { selector: '[data-part=stroke][data-level=medium]', state: 'visible' } },
  { wait: 1100 },
]);
