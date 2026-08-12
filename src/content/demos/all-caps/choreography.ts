import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=sample-mixed]', state: 'visible' } },
  { assert: { selector: '[data-part=sample-tight]', state: 'visible' } },
  { assert: { selector: '[data-part=sample-tracked][data-tracking="0.09em"]', state: 'visible' } },
  { wait: 800 },
  // Setting answers no pointer: the cursor walks the three lines in the order the
  // comparison is made, cramped before corrected.
  { moveTo: '[data-part=sample-mixed]' },
  { wait: 900 },
  { moveTo: '[data-part=sample-tight]' },
  { wait: 1000 },
  { moveTo: '[data-part=sample-tracked]' },
  { wait: 1000 },
  { assert: { selector: '[data-part=sample-tracked]', state: 'visible' } },
  { moveTo: '[data-part=caption]' },
  { wait: 800 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
]);
