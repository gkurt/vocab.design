import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 400 },
  { assert: { selector: '[data-part=slot][data-level="0"]', state: 'visible' } },
  { assert: { selector: '[data-part=pane-0][data-current]', state: 'visible' } },
  { moveTo: '[data-part=row-shanties]' },
  { click: true },
  // Judged inside the 400 ms travel: both screens are moving, neither has landed.
  { assert: { selector: '[data-part=slot][data-state=moving]', state: 'visible' } },
  { wait: 700 },
  { assert: { selector: '[data-part=slot][data-level="1"][data-dir=push]', state: 'visible' } },
  { assert: { selector: '[data-part=pane-1][data-current]', state: 'visible' } },
  { assert: { selector: '[data-part=pane-0][data-current]', state: 'hidden' } },
  { wait: 600 },
  { moveTo: '[data-part=row-haul]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=slot][data-level="2"][data-dir=push][data-state=settled]', state: 'visible' } },
  { wait: 700 },
  // Each screen's own Back names the level under it, so popping is the same pair reversed.
  { moveTo: '[data-part=back-2]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=slot][data-level="1"][data-dir=pop]', state: 'visible' } },
  { wait: 500 },
  { moveTo: '[data-part=back-1]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=slot][data-level="0"][data-dir=pop][data-state=settled]', state: 'visible' } },
  { assert: { selector: '[data-part=pane-0][data-current]', state: 'visible' } },
  { wait: 500 },
]);
