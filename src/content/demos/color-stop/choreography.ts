import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=stop-b][data-pos="50"]', state: 'visible' } },
  { wait: 700 },
  // Pressing a marker selects it, and the readout says which colour is pinned where.
  { moveTo: '[data-part=stop-b]' },
  { click: true },
  { assert: { selector: '[data-part=stop-b][data-selected]', state: 'visible' } },
  { wait: 700 },
  // Every drag ends on a labelled tick, so the position it reaches is absolute (SPEC §8).
  { drag: { to: '[data-part=tick-25]' } },
  { assert: { selector: '[data-part=stop-b][data-pos="25"]', state: 'visible' } },
  { wait: 1100 },
  { moveTo: '[data-part=stop-b]' },
  { drag: { to: '[data-part=tick-75]' } },
  { assert: { selector: '[data-part=stop-b][data-pos="75"]', state: 'visible' } },
  { wait: 1100 },
  { moveTo: '[data-part=stop-b]' },
  { drag: { to: '[data-part=tick-50]' } },
  { assert: { selector: '[data-part=stop-b][data-pos="50"]', state: 'visible' } },
  { assert: { selector: '[data-part=strip]', state: 'visible' } },
  { wait: 1000 },
]);
