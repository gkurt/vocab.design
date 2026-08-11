import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=ruled]', state: 'visible' } },
  { assert: { selector: '[data-part=sample-large]', state: 'visible' } },
  { assert: { selector: '[data-part=sample-small]', state: 'visible' } },
  { wait: 800 },
  // A measurement answers no pointer: the cursor only travels the distance the
  // ruling is about, from one face's mean line to the other's.
  { moveTo: '[data-part=sample-large]' },
  { wait: 1000 },
  { moveTo: '[data-part=sample-small]' },
  { wait: 1100 },
  { moveTo: '[data-part=caption]' },
  { wait: 800 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
]);
