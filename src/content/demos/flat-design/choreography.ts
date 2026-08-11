import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 700 },
  { moveTo: '[data-part=flat]' },
  { assert: { selector: '[data-part=flat]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=depth]' },
  { assert: { selector: '[data-part=depth]', state: 'visible' } },
  { wait: 1100 },
]);
