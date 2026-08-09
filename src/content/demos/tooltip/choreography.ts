import { steps } from '#src/stage/choreography.ts';

export default steps([
  { moveTo: '[data-part=share]' },
  { wait: 500 },
  { assert: { selector: '[data-part=tooltip]', state: 'hidden' } },
  { moveTo: '[data-part=trigger]' },
  { wait: 700 },
  { assert: { selector: '[data-part=tooltip]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=star]' },
  { wait: 400 },
  { assert: { selector: '[data-part=tooltip]', state: 'hidden' } },
]);
