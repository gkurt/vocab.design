import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Both ramps are on stage from mount, so the pose already shows the axis.
  { assert: { selector: '[data-part=ramp][data-hue="blue"]', state: 'visible' } },
  { assert: { selector: '[data-part=sat-ramp]', state: 'visible' } },
  { wait: 900 },
  // Each segment names one base outright, so a pass picked up anywhere lands the same.
  { moveTo: '[data-part=seg-green]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=ramp][data-hue="green"]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-amber]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=ramp][data-hue="amber"]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-blue]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=ramp][data-hue="blue"]', state: 'visible' } },
  { wait: 900 },
]);
