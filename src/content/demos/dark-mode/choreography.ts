import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The dark panel is on stage from mount, so the pose already shows the term.
  { assert: { selector: '[data-part=dark][data-mode="derived"][data-lift="up"]', state: 'visible' } },
  { assert: { selector: '[data-part=light]', state: 'visible' } },
  { wait: 900 },
  // Each segment names an absolute derivation, so a pass picked up anywhere lands the same.
  { moveTo: '[data-part=seg-flipped]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=dark][data-mode="flipped"][data-lift="down"]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=seg-derived]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=dark][data-mode="derived"][data-lift="up"]', state: 'visible' } },
  { wait: 1200 },
]);
