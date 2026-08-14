import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=pair]', state: 'visible' } },
  { assert: { selector: '[data-part=caption-cut]', state: 'visible' } },
  { assert: { selector: '[data-part=display-cut]', state: 'visible' } },
  { wait: 800 },
  // A comparison answers no pointer: the cursor travels the distance the two
  // drawings are apart, then down to the sizes each of them is for.
  { moveTo: '[data-part=caption-cut]' },
  { wait: 1100 },
  { moveTo: '[data-part=display-cut]' },
  { wait: 1100 },
  { moveTo: '[data-part=intended]' },
  { wait: 1000 },
  { assert: { selector: '[data-part=intended]', state: 'visible' } },
  { moveTo: '[data-part=caption]' },
  { wait: 800 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
]);
