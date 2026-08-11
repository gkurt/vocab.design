import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=thumb-2]', state: 'visible' } },
  { moveTo: '[data-part=thumb-2]' },
  { click: true },
  { wait: 450 },
  { assert: { selector: '[data-part=thumb-2][aria-current="true"]', state: 'visible' } },
  { moveTo: '[data-part=thumb-4]' },
  { click: true },
  { wait: 450 },
  { assert: { selector: '[data-part=thumb-4][aria-current="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=preview]', state: 'visible' } },
]);
