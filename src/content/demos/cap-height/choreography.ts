import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=ruled]', state: 'visible' } },
  { assert: { selector: '[data-part=specimen]', state: 'visible' } },
  { wait: 800 },
  // A measurement answers no pointer, so the cursor only walks the distance the
  // ruling is about: the word, then the two squares the metric decides.
  { moveTo: '[data-part=specimen]' },
  { wait: 1100 },
  { moveTo: '[data-part=cap-aligned]' },
  { wait: 900 },
  { assert: { selector: '[data-part=cap-aligned]', state: 'visible' } },
  { moveTo: '[data-part=em-aligned]' },
  { wait: 900 },
  { assert: { selector: '[data-part=em-aligned]', state: 'visible' } },
  { moveTo: '[data-part=caption]' },
  { wait: 900 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
]);
