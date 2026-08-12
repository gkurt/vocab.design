import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=shape]', state: 'visible' } },
  { assert: { selector: '[data-part=arc]', state: 'visible' } },
  { assert: { selector: '[data-part=detail]', state: 'visible' } },
  { wait: 800 },
  // An outline answers no pointer: the cursor travels the comparison, whole shape
  // first and then the corner where the two curves part company.
  { moveTo: '[data-part=shape]' },
  { wait: 1100 },
  { moveTo: '[data-part=detail]' },
  { wait: 1100 },
  { moveTo: '[data-part=caption]' },
  { wait: 800 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 500 },
]);
