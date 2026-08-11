import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=save][data-sim-focus]', state: 'visible' } },
  { wait: 500 },
  { moveTo: '[data-part=save]' },
  { click: true },
  { wait: 600 },
  // The pointer route: focus is reported, the ring is not drawn.
  { assert: { selector: '[data-part=save][data-route=pointer]', state: 'visible' } },
  { assert: { selector: '[data-part=save][data-sim-focus]', state: 'hidden' } },
  { wait: 900 },
  { press: 'Tab' },
  { wait: 600 },
  { assert: { selector: '[data-part=save][data-route=keyboard]', state: 'visible' } },
  { assert: { selector: '[data-part=save][data-sim-focus]', state: 'visible' } },
  { wait: 800 },
]);
