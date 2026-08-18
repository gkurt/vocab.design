import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The window fades in from mount, so the resting claims wait for it to land.
  { wait: 700 },
  { assert: { selector: '[data-part=hour-wheel][data-value="09"]', state: 'visible' } },
  { assert: { selector: '[data-part=hour-9][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=min-30][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-time="09:30 AM"]', state: 'visible' } },
  { wait: 600 },
  // Two rows up the column is two rows of travel: the drum follows the pointer, so the
  // values that were below the band come up into it and the hour lands on 11.
  { moveTo: '[data-part=hour-wheel]' },
  { drag: { to: '[data-part=hour-7]' } },
  { wait: 600 },
  { assert: { selector: '[data-part=hour-11][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=hour-wheel][data-value="11"]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-time="11:30 AM"]', state: 'visible' } },
  { wait: 900 },
  // Downward on the minutes, which brings the earlier values back under the band.
  { moveTo: '[data-part=minute-wheel]' },
  { drag: { to: '[data-part=min-40]' } },
  { wait: 600 },
  { assert: { selector: '[data-part=min-20][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=minute-wheel][data-value="20"]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-time="11:20 AM"]', state: 'visible' } },
  // The band never moved: it is the values that travelled under it.
  { assert: { selector: '[data-part=band]', state: 'visible' } },
  { wait: 900 },
]);
