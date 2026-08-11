import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=wall]', state: 'visible' } },
  // Metered is the placement that carries a count, so the count is on screen.
  { assert: { selector: '[data-part=meter]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=placement-hard]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=placement][data-value=hard]', state: 'visible' } },
  { assert: { selector: '[data-part=meter]', state: 'hidden' } },
  { assert: { selector: '[data-part=wall]', state: 'visible' } },
  { wait: 1100 },
  { moveTo: '[data-part=placement-metered]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=meter]', state: 'visible' } },
  { wait: 900 },
]);
