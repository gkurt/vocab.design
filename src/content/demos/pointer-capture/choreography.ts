import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=capture][data-level=mid]', state: 'visible' } },
  { assert: { selector: '[data-part=loose][data-state=idle]', state: 'visible' } },
  // The wander: from the thumb to a point well off the control, the same point both times.
  { moveTo: '[data-part=capture-thumb]' },
  { wait: 500 },
  { drag: { to: '[data-part=away]' } },
  { assert: { selector: '[data-part=capture][data-level=full]', state: 'visible' } },
  { wait: 1100 },
  // The same stroke on a control that never claimed the pointer.
  { moveTo: '[data-part=loose-thumb]' },
  { wait: 500 },
  { drag: { to: '[data-part=away]' } },
  { assert: { selector: '[data-part=loose][data-state=lost]', state: 'visible' } },
  { wait: 1200 },
]);
