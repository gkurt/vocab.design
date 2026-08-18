import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 700 },
  // Zoomed all the way out: the unit is a year.
  { assert: { selector: '[data-part=zoom][data-level=years]', state: 'visible' } },
  { assert: { selector: '[data-part=view-years]', state: 'visible' } },
  { assert: { selector: '[data-part=view-events]', state: 'hidden' } },
  { wait: 1000 },
  // One step in: the same record redrawn with a month as the unit.
  { moveTo: '[data-part=seg-months]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=zoom][data-level=months]', state: 'visible' } },
  { assert: { selector: '[data-part=view-months]', state: 'visible' } },
  { assert: { selector: '[data-part=view-years]', state: 'hidden' } },
  { wait: 1400 },
  // Zoomed in: individual entries, each with its own label.
  { moveTo: '[data-part=seg-events]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=zoom][data-level=events]', state: 'visible' } },
  { assert: { selector: '[data-part=view-events]', state: 'visible' } },
  { assert: { selector: '[data-part=view-months]', state: 'hidden' } },
  { wait: 1500 },
  // Back out to years.
  { moveTo: '[data-part=seg-years]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=zoom][data-level=years]', state: 'visible' } },
  { assert: { selector: '[data-part=view-years]', state: 'visible' } },
  { wait: 800 },
]);
