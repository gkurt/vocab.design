import { steps } from '#src/stage/choreography.ts';

/**
 * The row read in source order, then the same markup with Alerts pulled to the front by CSS
 * and read again: it is the first card on screen and still the third thing spoken. Stepping
 * clamps at the last card and each segment reaches its own build, so a pass joined halfway
 * proves the same thing (SPEC §8).
 */
export default steps([
  { assert: { selector: '[data-part=row][data-mode=matched]', state: 'visible' } },
  { assert: { selector: '[data-part=card-alerts][data-visual="3"]', state: 'visible' } },
  { assert: { selector: '[data-part=voice][data-state=match]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=next]' },
  { click: true },
  { wait: 500 },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=card-alerts][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=voice][data-state=match]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=seg-reordered]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=row][data-mode=reordered]', state: 'visible' } },
  { assert: { selector: '[data-part=card-alerts][data-visual="1"]', state: 'visible' } },
  { assert: { selector: '[data-part=card-summary][data-sim-focus]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=next]' },
  { click: true },
  { wait: 500 },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=card-alerts][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=voice][data-state=mismatch]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-matched]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=row][data-mode=matched]', state: 'visible' } },
  { assert: { selector: '[data-part=card-alerts][data-visual="3"]', state: 'visible' } },
  { wait: 900 },
]);
