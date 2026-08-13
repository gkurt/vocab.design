import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The strip is on stage from mount, so the pose already shows the term.
  { assert: { selector: '[data-part=strip][data-space="srgb"]', state: 'visible' } },
  { assert: { selector: '[data-part=cell-50]', state: 'visible' } },
  { wait: 900 },
  // Each segment names one space outright, so a pass picked up anywhere lands the same.
  { moveTo: '[data-part=seg-oklab]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=strip][data-space="oklab"]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-oklch]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=strip][data-space="oklch"]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-srgb]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=strip][data-space="srgb"]', state: 'visible' } },
  { wait: 900 },
]);
