import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=menu][data-open]', state: 'hidden' } },
  { moveTo: '[data-part=tile-2]' },
  { wait: 300 },
  { click: true },
  { wait: 300 },
  // The primary press did one thing and only one thing.
  { assert: { selector: '[data-part=tile-2][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=menu][data-open]', state: 'hidden' } },
  { wait: 500 },
  { rightClick: true },
  // Past the menu's own 140 ms entrance, so the claim is not sitting on its edge.
  { wait: 400 },
  { assert: { selector: '[data-part=menu][data-open]', state: 'visible' } },
  { assert: { selector: '[data-part=menu-rename]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=menu-rename]' },
  { click: true },
  { wait: 400 },
  // Choosing an item is the dismissal; the file it was asked about stays selected.
  { assert: { selector: '[data-part=menu][data-open]', state: 'hidden' } },
  { assert: { selector: '[data-part=tile-2][aria-selected="true"]', state: 'visible' } },
  { wait: 1200 },
]);
