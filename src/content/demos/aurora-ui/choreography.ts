import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 800 },
  { assert: { selector: '[data-part=aurora]', state: 'visible' } },
  { assert: { selector: '[data-part=blob-1]', state: 'visible' } },
  { moveTo: '[data-part=card]' },
  { wait: 1200 },
  { assert: { selector: '[data-part=blob-4]', state: 'visible' } },
  { moveTo: '[data-part=aurora]' },
  { wait: 1400 },
]);
