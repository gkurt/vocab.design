import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=month][data-month="2025-04"]', state: 'visible' } },
  { assert: { selector: '[data-part=grid]', state: 'visible' } },
  { moveTo: '[data-part=day-2025-04-17]' },
  { click: true },
  { wait: 340 },
  { assert: { selector: '[data-part=day-2025-04-17][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=chosen][data-chosen="2025-04-17"]', state: 'visible' } },
  { wait: 800 },
  // Paging reaches a month rather than stepping from wherever the pass began: the
  // specimen holds two, and both ends say they are spent (SPEC §8).
  { moveTo: '[data-part=nav-next]' },
  { click: true },
  { wait: 420 },
  { assert: { selector: '[data-part=month][data-month="2025-05"]', state: 'visible' } },
  { assert: { selector: '[data-part=day-2025-04-17]', state: 'hidden' } },
  { wait: 700 },
  { moveTo: '[data-part=day-2025-05-06]' },
  { click: true },
  { wait: 340 },
  { assert: { selector: '[data-part=day-2025-05-06][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=chosen][data-chosen="2025-05-06"]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=nav-prev]' },
  { click: true },
  { wait: 420 },
  { assert: { selector: '[data-part=month][data-month="2025-04"]', state: 'visible' } },
  // One date, not one per month: April's day gave the selection up when May took it.
  { assert: { selector: '[data-part=day-2025-04-17][aria-selected="true"]', state: 'hidden' } },
  { wait: 900 },
]);
