import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=far][data-hit]', state: 'hidden' } },
  { assert: { selector: '[data-part=near][data-hit]', state: 'hidden' } },
  // The far, small one first: both terms of the model working against the hand.
  { moveTo: '[data-part=far]' },
  { wait: 450 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=far][data-hit]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-target=far]', state: 'visible' } },
  { wait: 900 },
  // Then the near, large one: the same journey with both terms in its favour.
  { moveTo: '[data-part=near]' },
  { wait: 400 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=near][data-hit]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-target=near]', state: 'visible' } },
  { wait: 900 },
  // And the edge, which is further than either and easier than both.
  { moveTo: '[data-part=edge]' },
  { wait: 400 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=edge][data-hit]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-target=edge]', state: 'visible' } },
  { wait: 1000 },
]);
