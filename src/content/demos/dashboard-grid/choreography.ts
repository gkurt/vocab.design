import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Mount is the ranked field: the chart owns eight columns and two rows.
  { assert: { selector: '[data-part=grid][data-mode=sized]', state: 'visible' } },
  { assert: { selector: '[data-part=card-chart]', state: 'visible' } },
  { assert: { selector: '[data-part=card-list]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-uniform]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=seg-uniform][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=grid][data-mode=uniform]', state: 'visible' } },
  // Same six tiles, same field: only the area each one claims has changed.
  { assert: { selector: '[data-part=card-chart]', state: 'visible' } },
  { assert: { selector: '[data-part=card-revenue]', state: 'visible' } },
  { wait: 1500 },
  // Each segment names an arrangement, so the way back is an arrangement too.
  { moveTo: '[data-part=seg-sized]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=grid][data-mode=sized]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { wait: 900 },
]);
