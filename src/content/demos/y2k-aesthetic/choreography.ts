import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=card]', state: 'visible' } },
  { assert: { selector: '[data-part=wordmark]', state: 'visible' } },
  { assert: { selector: '[data-part=flare]', state: 'visible' } },
  { assert: { selector: '[data-part=status]', state: 'hidden' } },
  { moveTo: '[data-part=enter]' },
  { wait: 600 },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=status]', state: 'visible' } },
  { wait: 1200 },
]);
