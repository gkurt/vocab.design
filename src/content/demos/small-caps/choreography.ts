import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=run-caps]', state: 'visible' } },
  { assert: { selector: '[data-part=run-small]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=line-caps]' },
  { wait: 1000 },
  { moveTo: '[data-part=line-small]' },
  { wait: 1000 },
  { moveTo: '[data-part=caption]' },
  { wait: 800 },
  { assert: { selector: '[data-part=run-small]', state: 'visible' } },
  { wait: 600 },
]);
