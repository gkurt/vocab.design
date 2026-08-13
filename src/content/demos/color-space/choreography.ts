import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Both strips are on stage from mount, so the pose already shows the comparison.
  { assert: { selector: '[data-part=panel][data-pair="blue"]', state: 'visible' } },
  { assert: { selector: '[data-part=strip-oklch]', state: 'visible' } },
  { wait: 900 },
  // Each segment names one pair outright, so a pass picked up anywhere lands the same.
  { moveTo: '[data-part=seg-rose]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=panel][data-pair="rose"]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-green]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=panel][data-pair="green"]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-blue]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=panel][data-pair="blue"]', state: 'visible' } },
  { assert: { selector: '[data-part=strip-srgb]', state: 'visible' } },
  { wait: 900 },
]);
