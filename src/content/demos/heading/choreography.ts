import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=h1]', state: 'visible' } },
  { assert: { selector: '[data-part=h2]', state: 'visible' } },
  { assert: { selector: '[data-part=h3]', state: 'visible' } },
  { wait: 700 },
  // A heading answers no pointer, so the cursor reads the outline top down, the
  // way someone skimming for the section they want does.
  { moveTo: '[data-part=h1]' },
  { wait: 900 },
  { moveTo: '[data-part=h2]' },
  { wait: 1000 },
  { moveTo: '[data-part=h3]' },
  { wait: 900 },
  { assert: { selector: '[data-part=copy-h3]', state: 'visible' } },
  { moveTo: '[data-part=caption]' },
  { wait: 800 },
]);
