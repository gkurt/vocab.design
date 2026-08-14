import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The swatches are on stage from mount, so the pose already shows the term.
  { assert: { selector: '[data-part=keywords]', state: 'visible' } },
  { assert: { selector: '[data-part=preview][data-pair="text"]', state: 'visible' } },
  { assert: { selector: '[data-part=view-text]', state: 'visible' } },
  { wait: 1000 },
  // Each segment names one pair outright, so a pass picked up anywhere lands the same.
  { moveTo: '[data-part=seg-button]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=view-button]', state: 'visible' } },
  { assert: { selector: '[data-part=view-text]', state: 'hidden' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-selection]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=view-selection]', state: 'visible' } },
  { assert: { selector: '[data-part=view-button]', state: 'hidden' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-text]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=view-text]', state: 'visible' } },
  { assert: { selector: '[data-part=sw-canvas]', state: 'visible' } },
  { wait: 900 },
]);
