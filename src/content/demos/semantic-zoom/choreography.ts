import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 700 },
  // Zoomed all the way out: the unit is a year.
  { assert: { selector: '[data-part=zoom][data-level=years]', state: 'visible' } },
  { assert: { selector: '[data-part=view-years]', state: 'visible' } },
  { assert: { selector: '[data-part=view-events]', state: 'hidden' } },
  { wait: 800 },
  // Two contacts open on the region. The factor is continuous, the drawing is not: past
  // its threshold the same record is redrawn with a month as the unit.
  { moveTo: '[data-part=zoom]' },
  { wait: 400 },
  { pinch: { scale: 2.6, ms: 900 } },
  { wait: 700 },
  { assert: { selector: '[data-part=zoom][data-level=months]', state: 'visible' } },
  { assert: { selector: '[data-part=view-months]', state: 'visible' } },
  { assert: { selector: '[data-part=view-years]', state: 'hidden' } },
  { wait: 1300 },
  // Opening it further crosses the next threshold: individual entries, each with its own
  // label. Nothing was revealed and nothing was scaled, the representation was swapped.
  { pinch: { scale: 2.2, ms: 900 } },
  { wait: 700 },
  { assert: { selector: '[data-part=zoom][data-level=events]', state: 'visible' } },
  { assert: { selector: '[data-part=view-events]', state: 'visible' } },
  { assert: { selector: '[data-part=view-months]', state: 'hidden' } },
  { wait: 1400 },
  // The way back is the same gesture read the other way, and the floor snaps it home.
  { pinch: { scale: 0.15, ms: 1000 } },
  { wait: 700 },
  { assert: { selector: '[data-part=zoom][data-level=years]', state: 'visible' } },
  { assert: { selector: '[data-part=view-years]', state: 'visible' } },
  { wait: 900 },
]);
