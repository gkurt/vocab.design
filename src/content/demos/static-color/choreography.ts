import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for them to land.
  { wait: 420 },
  { assert: { selector: '[data-part=screen][data-scheme=light]', state: 'visible' } },
  { assert: { selector: '[data-part=app-button][data-hex="6750A4"]', state: 'visible' } },
  { assert: { selector: '[data-part=app-card][data-hex="E7E0EC"]', state: 'visible' } },
  { assert: { selector: '[data-part=lockup][data-hex="FF5A00"]', state: 'visible' } },
  { assert: { selector: '[data-part=badge][data-hex="B3170F"]', state: 'visible' } },
  { wait: 1400 },
  // Each segment names one scheme outright, so a pass picked up anywhere lands the same.
  { moveTo: '[data-part=seg-dark]' },
  { click: true },
  { wait: 600 },
  // Three roles re-derived.
  { assert: { selector: '[data-part=screen][data-scheme=dark]', state: 'visible' } },
  { assert: { selector: '[data-part=app-button][data-hex="D0BCFF"]', state: 'visible' } },
  { assert: { selector: '[data-part=app-card][data-hex="2B2930"]', state: 'visible' } },
  { assert: { selector: '[data-part=app-title][data-hex="E6E0E9"]', state: 'visible' } },
  // And the two that are not: same values, in the scheme that changed everything around them.
  { assert: { selector: '[data-part=lockup][data-hex="FF5A00"]', state: 'visible' } },
  { assert: { selector: '[data-part=badge][data-hex="B3170F"]', state: 'visible' } },
  { wait: 1800 },
  { moveTo: '[data-part=seg-light]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=screen][data-scheme=light]', state: 'visible' } },
  { assert: { selector: '[data-part=app-button][data-hex="6750A4"]', state: 'visible' } },
  { assert: { selector: '[data-part=lockup][data-hex="FF5A00"]', state: 'visible' } },
  { assert: { selector: '[data-part=badge][data-hex="B3170F"]', state: 'visible' } },
  { wait: 900 },
]);
