import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=card]', state: 'visible' } },
  { assert: { selector: '[data-part=drop]', state: 'visible' } },
  { assert: { selector: '[data-part=status]', state: 'hidden' } },
  { moveTo: '[data-part=start]' },
  { wait: 600 },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=status]', state: 'visible' } },
  { wait: 1200 },
]);
