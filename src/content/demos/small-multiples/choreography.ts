import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 700 },
  // Mount: six panels of one design, all drawn against the shared 0 to 100 domain.
  { assert: { selector: '[data-part=grid][data-scale=shared]', state: 'visible' } },
  { assert: { selector: '[data-part=panel-north]', state: 'visible' } },
  { assert: { selector: '[data-part=panel-central]', state: 'visible' } },
  { wait: 1000 },
  // Per-panel scales: every panel fills its own box and the comparison stops working.
  { moveTo: '[data-part=seg-own]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=grid][data-scale=own]', state: 'visible' } },
  { assert: { selector: '[data-part=top-central]', state: 'visible' } },
  { wait: 1400 },
  // Back to the one domain that makes the grid comparable.
  { moveTo: '[data-part=seg-shared]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=grid][data-scale=shared]', state: 'visible' } },
  { assert: { selector: '[data-part=panel-coast]', state: 'visible' } },
  { wait: 900 },
]);
