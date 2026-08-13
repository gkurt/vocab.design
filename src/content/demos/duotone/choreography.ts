import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The mapped image is on stage from mount, so the pose already shows the term.
  { assert: { selector: '[data-part=duotone][data-ramp="ink"]', state: 'visible' } },
  { assert: { selector: '[data-part=original]', state: 'visible' } },
  { wait: 900 },
  // Each segment names one ramp outright, so a pass picked up anywhere lands the same.
  { moveTo: '[data-part=seg-tide]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=duotone][data-ramp="tide"]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-flare]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=duotone][data-ramp="flare"]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-ink]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=duotone][data-ramp="ink"]', state: 'visible' } },
  { wait: 900 },
]);
