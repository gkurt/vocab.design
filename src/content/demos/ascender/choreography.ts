import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=ruled]', state: 'visible' } },
  { assert: { selector: '[data-part=specimen]', state: 'visible' } },
  { wait: 800 },
  // A measurement answers no pointer: the cursor only travels the specimen, the
  // key that names the rules, and the numbers the face was measured at.
  { moveTo: '[data-part=specimen]' },
  { wait: 1100 },
  { moveTo: '[data-part=legend]' },
  { wait: 900 },
  { assert: { selector: '[data-part=legend]', state: 'visible' } },
  { moveTo: '[data-part=metrics]' },
  { wait: 900 },
  { assert: { selector: '[data-part=metrics]', state: 'visible' } },
  { moveTo: '[data-part=caption]' },
  { wait: 800 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
]);
