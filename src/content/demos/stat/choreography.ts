import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=stat-value]', state: 'visible' } },
  { moveTo: '[data-part=stat]' },
  { wait: 500 },
  { assert: { selector: '[data-part=stat-delta]', state: 'visible' } },
  { moveTo: '[data-part=stat-delta]' },
  { wait: 400 },
  { assert: { selector: '[data-part=stat]', state: 'visible' } },
]);
