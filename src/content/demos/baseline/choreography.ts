import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=ruled]', state: 'visible' } },
  { assert: { selector: '[data-part=sample-small]', state: 'visible' } },
  { assert: { selector: '[data-part=sample-large]', state: 'visible' } },
  { wait: 800 },
  // A line answers no pointer: the cursor travels along it, from the small sample to
  // the large one sharing it, then down to the pair that does not.
  { moveTo: '[data-part=sample-small]' },
  { wait: 900 },
  { moveTo: '[data-part=sample-large]' },
  { wait: 1000 },
  { moveTo: '[data-part=centred]' },
  { wait: 900 },
  { assert: { selector: '[data-part=centred-small]', state: 'visible' } },
  { assert: { selector: '[data-part=centred-large]', state: 'visible' } },
  { moveTo: '[data-part=caption]' },
  { wait: 800 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
]);
