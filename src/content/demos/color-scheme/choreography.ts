import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The declaring panel is on stage from mount, so the pose already shows the term.
  { assert: { selector: '[data-part=panel][data-scheme="light"][data-resolved="light"]', state: 'visible' } },
  { wait: 800 },
  // The system flips first, and nothing moves: a page that declared one scheme has opted out.
  { moveTo: '[data-part=os-dark]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=panel][data-scheme="light"][data-resolved="light"]', state: 'visible' } },
  { wait: 900 },
  // Each segment names an absolute declaration, so a pass picked up anywhere lands the same.
  { moveTo: '[data-part=scheme-auto]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=panel][data-scheme="auto"][data-resolved="dark"]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=scheme-dark]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=panel][data-scheme="dark"][data-resolved="dark"]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=scheme-light]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=panel][data-scheme="light"][data-resolved="light"]', state: 'visible' } },
  { wait: 900 },
]);
