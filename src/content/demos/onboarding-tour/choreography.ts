import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=tip][data-step="1"]', state: 'visible' } },
  { assert: { selector: '[data-part=spot]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=tip-next]' },
  { click: true },
  { assert: { selector: '[data-part=tip][data-step="2"]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=tip-next]' },
  { click: true },
  { assert: { selector: '[data-part=tip][data-step="3"]', state: 'visible' } },
  { assert: { selector: '[data-part=tip-next][data-last]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=tip-next]' },
  { click: true },
  { assert: { selector: '[data-part=tip]', state: 'hidden' } },
  { assert: { selector: '[data-part=spot]', state: 'hidden' } },
  { wait: 1200 },
]);
