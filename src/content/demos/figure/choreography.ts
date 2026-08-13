import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=figure]', state: 'visible' } },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 700 },
  // A figure answers no pointer, so the cursor only walks the reference: from the
  // number in the running text to the caption that number names.
  { moveTo: '[data-part=xref]' },
  { wait: 1000 },
  { moveTo: '[data-part=caption]' },
  { wait: 1100 },
  { assert: { selector: '[data-part=figure-2]', state: 'visible' } },
  { moveTo: '[data-part=caption-2]' },
  { wait: 1000 },
  // The same binding again, around a listing rather than a picture.
  { assert: { selector: '[data-part=caption-2]', state: 'visible' } },
  { wait: 900 },
]);
