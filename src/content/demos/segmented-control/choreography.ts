import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=seg-week][aria-selected="true"]', state: 'visible' } },
  { moveTo: '[data-part=seg-month]' },
  { click: true },
  { assert: { selector: '[data-part=seg-month][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=seg-week][aria-selected="true"]', state: 'hidden' } },
  { wait: 1100 },
  { moveTo: '[data-part=seg-day]' },
  { click: true },
  { assert: { selector: '[data-part=seg-day][aria-selected="true"]', state: 'visible' } },
  { wait: 900 },
]);
