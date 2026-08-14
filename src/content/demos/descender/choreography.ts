import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=ruled]', state: 'visible' } },
  { assert: { selector: '[data-part=specimen]', state: 'visible' } },
  { wait: 800 },
  // A measurement answers no pointer: the cursor travels from the ruled word to
  // the pair of boxes that show what happens when the depth is not reserved.
  { moveTo: '[data-part=specimen]' },
  { wait: 1100 },
  { moveTo: '[data-part=legend]' },
  { wait: 900 },
  { assert: { selector: '[data-part=legend]', state: 'visible' } },
  { moveTo: '[data-part=trimmed]' },
  { wait: 1000 },
  { assert: { selector: '[data-part=trimmed]', state: 'visible' } },
  { moveTo: '[data-part=roomy]' },
  { wait: 1000 },
  { assert: { selector: '[data-part=roomy]', state: 'visible' } },
]);
