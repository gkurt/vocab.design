import { steps } from '#src/stage/choreography.ts';

// A line answers no pointer: both sizes already sit on it and the centred pair
// already disagrees, so the pass states the comparison instead of walking it.
export default steps([
  { wait: 450 },
  { assert: { selector: '[data-part=ruled]', state: 'visible' } },
  { assert: { selector: '[data-part=sample-small]', state: 'visible' } },
  { assert: { selector: '[data-part=sample-large]', state: 'visible' } },
  { wait: 1200 },
  { assert: { selector: '[data-part=centred-small]', state: 'visible' } },
  { assert: { selector: '[data-part=centred-large]', state: 'visible' } },
  { wait: 1200 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 900 },
]);
