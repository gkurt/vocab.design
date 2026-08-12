import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=heading][data-bound="preferred"]', state: 'visible' } },
  { assert: { selector: '[data-part=bound-preferred][data-selected]', state: 'visible' } },
  { wait: 700 },
  // Absolute widths, so a pass that starts over reaches the same three regimes it
  // reached last time (SPEC §8).
  { moveTo: '[data-part=thumb]' },
  { drag: { to: '[data-part=stop-320]' } },
  { wait: 600 },
  { assert: { selector: '[data-part=heading][data-bound="min"]', state: 'visible' } },
  { assert: { selector: '[data-part=bound-min][data-selected]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=thumb]' },
  { drag: { to: '[data-part=stop-1280]' } },
  { wait: 600 },
  { assert: { selector: '[data-part=heading][data-bound="max"]', state: 'visible' } },
  { assert: { selector: '[data-part=bound-max][data-selected]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=thumb]' },
  { drag: { to: '[data-part=stop-800]' } },
  { wait: 600 },
  { assert: { selector: '[data-part=heading][data-bound="preferred"]', state: 'visible' } },
  { assert: { selector: '[data-part=width]', state: 'visible' } },
  { wait: 800 },
]);
