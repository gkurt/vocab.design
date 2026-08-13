import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The diagram is on stage from mount, so the pose already shows the term.
  { assert: { selector: '[data-part=diagram][data-space="srgb"]', state: 'visible' } },
  { assert: { selector: '[data-part=row-srgb][data-selected]', state: 'visible' } },
  { wait: 900 },
  // Each segment names one gamut outright, so a pass picked up anywhere lands the same.
  { moveTo: '[data-part=seg-p3]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=diagram][data-space="p3"]', state: 'visible' } },
  { assert: { selector: '[data-part=row-p3][data-selected]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-rec2020]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=diagram][data-space="rec2020"]', state: 'visible' } },
  { assert: { selector: '[data-part=tri-rec2020]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-srgb]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=diagram][data-space="srgb"]', state: 'visible' } },
  { wait: 900 },
]);
