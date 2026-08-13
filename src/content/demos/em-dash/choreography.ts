import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=glyph-hyphen]', state: 'visible' } },
  { assert: { selector: '[data-part=glyph-en-dash]', state: 'visible' } },
  { assert: { selector: '[data-part=glyph-em-dash]', state: 'visible' } },
  { wait: 800 },
  // A ruled comparison answers no pointer: the cursor travels the widths themselves,
  // shortest mark to longest, then down to the reference letters they are named for.
  { moveTo: '[data-part=row-hyphen]' },
  { wait: 900 },
  { moveTo: '[data-part=row-en-dash]' },
  { wait: 900 },
  { moveTo: '[data-part=row-em-dash]' },
  { wait: 1000 },
  { moveTo: '[data-part=reference]' },
  { wait: 900 },
  { assert: { selector: '[data-part=reference]', state: 'visible' } },
  { moveTo: '[data-part=house]' },
  { wait: 900 },
  { assert: { selector: '[data-part=house]', state: 'visible' } },
]);
