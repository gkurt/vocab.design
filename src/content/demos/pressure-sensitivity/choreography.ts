import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to arrive.
  { wait: 500 },
  { assert: { selector: '[data-part=stroke][data-level=medium]', state: 'visible' } },
  { wait: 600 },
  // The lightest reading the pen could send: the same ribbon, drawn thin all the way through.
  { moveTo: '[data-part=level-light]' },
  { wait: 500 },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=stroke][data-level=light]', state: 'visible' } },
  { wait: 900 },
  // The firmest: the swell through the middle of the gesture is the pressure curve made visible.
  { moveTo: '[data-part=level-firm]' },
  { wait: 500 },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=stroke][data-level=firm]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=level-medium]' },
  { wait: 500 },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=stroke][data-level=medium]', state: 'visible' } },
  { wait: 1100 },
]);
