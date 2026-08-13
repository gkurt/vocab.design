import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=jobs]', state: 'visible' } },
  { assert: { selector: '[data-part=job-range]', state: 'visible' } },
  { wait: 800 },
  // A ruled comparison answers no pointer: the cursor reads the jobs in order,
  // then drops to the family the mark is told apart from.
  { moveTo: '[data-part=job-range]' },
  { wait: 900 },
  { moveTo: '[data-part=job-score]' },
  { wait: 900 },
  { moveTo: '[data-part=job-link]' },
  { wait: 900 },
  { assert: { selector: '[data-part=job-link]', state: 'visible' } },
  { moveTo: '[data-part=mark-en]' },
  { wait: 900 },
  { assert: { selector: '[data-part=mark-hyphen]', state: 'visible' } },
  { assert: { selector: '[data-part=mark-em]', state: 'visible' } },
  { wait: 900 },
]);
