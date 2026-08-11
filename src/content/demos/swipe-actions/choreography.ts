import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=actions]', state: 'hidden' } },
  { assert: { selector: '[data-part=tag]', state: 'hidden' } },
  { moveTo: '[data-part=row]' },
  { wait: 400 },
  // A drag to the row's leading edge: far enough past the commit distance that the
  // row settles open wherever the pass found it.
  { drag: { to: '[data-part=row-start]' } },
  { wait: 500 },
  { assert: { selector: '[data-part=row][data-open]', state: 'visible' } },
  { assert: { selector: '[data-part=actions]', state: 'visible' } },
  { wait: 1100 },
  // Dismissal is explicit: the action runs and puts the row back itself.
  { moveTo: '[data-part=action-archive]' },
  { wait: 300 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=tag]', state: 'visible' } },
  { assert: { selector: '[data-part=actions]', state: 'hidden' } },
  { wait: 1000 },
]);
