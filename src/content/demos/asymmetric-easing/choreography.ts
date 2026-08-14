import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=scene][data-panel=in][data-state=settled]', state: 'visible' } },
  { assert: { selector: '[data-part=panel]', state: 'visible' } },
  { moveTo: '[data-part=btn-exit]' },
  { click: true },
  // The exit is 180 ms: it is always settled by the time a post-click assert is judged,
  // so the claim is the destination, not the flight.
  { wait: 500 },
  { assert: { selector: '[data-part=scene][data-panel=out][data-state=settled]', state: 'visible' } },
  { assert: { selector: '[data-part=panel]', state: 'hidden' } },
  { wait: 400 },
  { moveTo: '[data-part=btn-enter]' },
  { click: true },
  // The long, decelerating half needs most of its 340 ms before the claim is fair.
  { wait: 700 },
  { assert: { selector: '[data-part=scene][data-panel=in][data-state=settled]', state: 'visible' } },
  { assert: { selector: '[data-part=panel]', state: 'visible' } },
  { wait: 600 },
]);
