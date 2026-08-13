import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The blended disc is on stage from mount, so the pose already shows the term.
  { assert: { selector: '[data-part=top][data-mode="multiply"]', state: 'visible' } },
  { assert: { selector: '[data-part=under]', state: 'visible' } },
  { wait: 900 },
  // Each segment names one formula outright, so a pass picked up anywhere lands the same.
  { moveTo: '[data-part=seg-screen]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=top][data-mode="screen"]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-overlay]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=top][data-mode="overlay"]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-normal]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=top][data-mode="normal"]', state: 'visible' } },
  { wait: 1000 },
  { moveTo: '[data-part=seg-multiply]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=top][data-mode="multiply"]', state: 'visible' } },
  { wait: 900 },
]);
