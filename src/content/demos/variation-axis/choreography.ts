import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 400 },
  { assert: { selector: '[data-part=sample][data-at=default]', state: 'visible' } },
  { assert: { selector: '[data-part=chip-default][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=declaration]', state: 'visible' } },
  { wait: 800 },
  // Absolute landmarks on the axis, so a pass picked up anywhere reaches the same
  // three coordinates the record names (SPEC §8).
  { moveTo: '[data-part=thumb]' },
  { drag: { to: '[data-part=stop-900]' } },
  { wait: 700 },
  { assert: { selector: '[data-part=sample][data-at=max]', state: 'visible' } },
  { assert: { selector: '[data-part=chip-max][data-selected]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=thumb]' },
  { drag: { to: '[data-part=stop-100]' } },
  { wait: 700 },
  { assert: { selector: '[data-part=sample][data-at=min]', state: 'visible' } },
  { assert: { selector: '[data-part=chip-min][data-selected]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=thumb]' },
  { drag: { to: '[data-part=stop-400]' } },
  { wait: 700 },
  { assert: { selector: '[data-part=sample][data-at=default]', state: 'visible' } },
  { assert: { selector: '[data-part=record]', state: 'visible' } },
  { moveTo: '[data-part=caption]' },
  { wait: 900 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
]);
