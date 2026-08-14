import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=specimen]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { wait: 900 },
  // Nothing here answers a pointer: the keyword is resolved by the machine, not
  // by the reader, so the cursor only reads the line and then the table.
  { moveTo: '[data-part=specimen]' },
  { wait: 1100 },
  { moveTo: '[data-part=readout]' },
  { wait: 1000 },
  { moveTo: '[data-part=platforms]' },
  { wait: 1000 },
  { assert: { selector: '[data-part=platforms]', state: 'visible' } },
  { moveTo: '[data-part=row-android]' },
  { wait: 900 },
  { assert: { selector: '[data-part=row-android]', state: 'visible' } },
]);
