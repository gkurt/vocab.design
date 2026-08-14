import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Every line is on stage from mount, so the pose already shows the term.
  { assert: { selector: '[data-part=spark-sessions]', state: 'visible' } },
  { assert: { selector: '[data-part=spark-errors]', state: 'visible' } },
  { assert: { selector: '[data-part=value-sessions]', state: 'visible' } },
  { wait: 900 },
  // A sparkline answers no pointer, so the cursor only walks the reading the panel
  // is for: the rising line, the number it belongs to, then the flat row beneath.
  { moveTo: '[data-part=spark-sessions]' },
  { wait: 1100 },
  { moveTo: '[data-part=value-sessions]' },
  { wait: 900 },
  { moveTo: '[data-part=spark-latency]' },
  { wait: 1000 },
  { assert: { selector: '[data-part=spark-latency]', state: 'visible' } },
  { moveTo: '[data-part=spark-errors]' },
  { wait: 1000 },
  { moveTo: '[data-part=caption]' },
  { wait: 900 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
]);
