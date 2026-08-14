import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The sweep is on stage from mount, so the pose already shows the term.
  { assert: { selector: '[data-part=disc][data-shape="wheel"]', state: 'visible' } },
  { wait: 1100 },
  { moveTo: '[data-part=seg-pie]' },
  { click: true },
  { wait: 600 },
  // Same element, same box: only the stop list changed, and hard stops made slices of it.
  { assert: { selector: '[data-part=disc][data-shape="pie"]', state: 'visible' } },
  { assert: { selector: '[data-part=code]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-ring]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=disc][data-shape="ring"]', state: 'visible' } },
  { assert: { selector: '[data-part=note]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-wheel]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=disc][data-shape="wheel"]', state: 'visible' } },
  { wait: 900 },
]);
