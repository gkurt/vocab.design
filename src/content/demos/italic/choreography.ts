import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=sample-roman]', state: 'visible' } },
  { assert: { selector: '[data-part=sample-italic]', state: 'visible' } },
  { wait: 800 },
  // A letterform answers no pointer, so the cursor only walks the comparison in
  // the order a reader would: upright, drawn italic, then the fake beside it.
  { moveTo: '[data-part=sample-roman]' },
  { wait: 900 },
  { moveTo: '[data-part=sample-italic]' },
  { wait: 1100 },
  { moveTo: '[data-part=sample-oblique]' },
  { wait: 1000 },
  { assert: { selector: '[data-part=sample-oblique]', state: 'visible' } },
  { moveTo: '[data-part=caption]' },
  { wait: 800 },
]);
