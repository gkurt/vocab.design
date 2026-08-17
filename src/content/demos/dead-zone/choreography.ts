import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to arrive.
  { wait: 500 },
  { assert: { selector: '[data-part=band]', state: 'visible' } },
  { assert: { selector: '[data-part=axis][data-out=ignored]', state: 'visible' } },
  // A real movement of the stick, entirely inside the band: the axis emits nothing.
  { moveTo: '[data-part=mark-centre]' },
  { wait: 500 },
  { drag: { to: '[data-part=mark-inside]' } },
  { wait: 400 },
  { assert: { selector: '[data-part=axis][data-out=ignored]', state: 'visible' } },
  { wait: 900 },
  // Past the band's edge, and the axis starts reporting.
  { drag: { to: '[data-part=mark-outside]' } },
  { wait: 400 },
  { assert: { selector: '[data-part=axis][data-out=live]', state: 'visible' } },
  { wait: 1000 },
  // Back through the edge to the centre, and it goes quiet again.
  { drag: { to: '[data-part=mark-centre]' } },
  { wait: 400 },
  { assert: { selector: '[data-part=axis][data-out=ignored]', state: 'visible' } },
  { wait: 900 },
]);
