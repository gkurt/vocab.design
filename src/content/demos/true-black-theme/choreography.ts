import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The true black panel is on stage from mount, so the pose already shows the term.
  { assert: { selector: '[data-part=black][data-view="surfaces"]', state: 'visible' } },
  { assert: { selector: '[data-part=black-surfaces]', state: 'visible' } },
  { assert: { selector: '[data-part=black-text]', state: 'hidden' } },
  { wait: 1400 },
  // Each segment names one view outright, so a pass picked up anywhere lands the same.
  { moveTo: '[data-part=seg-text]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=black][data-view="text"]', state: 'visible' } },
  { assert: { selector: '[data-part=black-text]', state: 'visible' } },
  { assert: { selector: '[data-part=near-text]', state: 'visible' } },
  { assert: { selector: '[data-part=black-surfaces]', state: 'hidden' } },
  { wait: 1600 },
  { moveTo: '[data-part=seg-surfaces]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=black][data-view="surfaces"]', state: 'visible' } },
  { assert: { selector: '[data-part=black-surfaces]', state: 'visible' } },
  { wait: 1000 },
]);
