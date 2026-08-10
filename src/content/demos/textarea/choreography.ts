import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=box]', state: 'visible' } },
  { assert: { selector: '[data-part=measure][data-overflow]', state: 'hidden' } },
  { moveTo: '[data-part=box]' },
  { click: true },
  { type: 'The lift on the north stairwell has been out of service since Tuesday morning.' },
  { wait: 900 },
  { type: '\nBuilding services have ordered the part, so please use the south lift in the meantime.' },
  // Long enough that the box would have finished growing, if growing were what it did.
  { wait: 1000 },
  { assert: { selector: '[data-part=measure][data-overflow]', state: 'visible' } },
  { assert: { selector: '[data-part=measure][data-steady]', state: 'visible' } },
  { wait: 600 },
  // The first line is still there, one scroll up, inside a box that never moved.
  { scroll: { y: -90 } },
  { wait: 900 },
  { assert: { selector: '[data-part=box]', state: 'visible' } },
  { moveTo: '[data-part=post]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=measure][data-overflow]', state: 'hidden' } },
  { assert: { selector: '[data-part=measure][data-steady]', state: 'visible' } },
]);
