import { steps } from '#src/stage/choreography.ts';

/**
 * The container declares flex-visual and the first tab stop is the tile the eye meets
 * first, with the sequence running 1 to 6 across the grid. Switched to normal, the same
 * boxes stay exactly where they are and the sequence jumps: Search is read first from the
 * bottom right corner. Each segment reaches its own build and the walk clamps at the last
 * tile, so a pass joined halfway proves the same thing (SPEC §8).
 */
export default steps([
  { assert: { selector: '[data-part=grid][data-flow=flex-visual]', state: 'visible' } },
  { assert: { selector: '[data-part=sequence][data-state=linear]', state: 'visible' } },
  { assert: { selector: '[data-part=tile-search][data-place="6"]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=tab]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=tile-sort][data-sim-focus]', state: 'visible' } },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=tile-filters][data-sim-focus]', state: 'visible' } },
  { wait: 1000 },
  { moveTo: '[data-part=seg-normal]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=grid][data-flow=normal]', state: 'visible' } },
  { assert: { selector: '[data-part=sequence][data-state=zigzag]', state: 'visible' } },
  { assert: { selector: '[data-part=tile-search][data-place="1"]', state: 'visible' } },
  { assert: { selector: '[data-part=tile-sort][data-place="4"]', state: 'visible' } },
  { wait: 600 },
  { moveTo: '[data-part=tab]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=tile-search][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=tile-sort][data-sim-focus]', state: 'hidden' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-flow]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=grid][data-flow=flex-visual]', state: 'visible' } },
  { assert: { selector: '[data-part=sequence][data-state=linear]', state: 'visible' } },
  { wait: 800 },
]);
