import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=minimal]', state: 'visible' } },
  { moveTo: '[data-part=decorated]' },
  { wait: 900 },
  { assert: { selector: '[data-part=decorated]', state: 'visible' } },
  { moveTo: '[data-part=start]' },
  { wait: 500 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=note][data-done]', state: 'visible' } },
  { wait: 1100 },
]);
