import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=canvas][data-type=linear]', state: 'visible' } },
  { moveTo: '[data-part=seg-radial]' },
  { click: true },
  // Same three stops, swept from a point instead of along an axis.
  { assert: { selector: '[data-part=canvas][data-type=radial]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-conic]' },
  { click: true },
  { assert: { selector: '[data-part=canvas][data-type=conic]', state: 'visible' } },
  { wait: 1300 },
]);
