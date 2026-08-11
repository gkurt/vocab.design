import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=task-1][data-done]', state: 'visible' } },
  { assert: { selector: '[data-part=task-2][data-done]', state: 'hidden' } },
  { assert: { selector: '[data-part=card][data-complete]', state: 'hidden' } },
  { moveTo: '[data-part=task-2]' },
  { click: true },
  { assert: { selector: '[data-part=task-2][data-done]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=task-3]' },
  { click: true },
  { assert: { selector: '[data-part=task-3][data-done]', state: 'visible' } },
  { assert: { selector: '[data-part=card][data-complete]', state: 'visible' } },
  { wait: 1500 },
]);
