import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The window fades in from mount, and the picture has to decode, so the first
  // claims wait for both.
  { wait: 800 },
  { assert: { selector: '[data-part=slot][data-state=loaded]', state: 'visible' } },
  { assert: { selector: '[data-part=image]', state: 'visible' } },
  { assert: { selector: '[data-part=alt-box]', state: 'hidden' } },
  { wait: 500 },
  // The trigger only ever opens the alt panel; the close in it is the dismissal.
  { moveTo: '[data-part=alt-show]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=alt-box]', state: 'visible' } },
  { assert: { selector: '[data-part=alt-text]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=alt-hide]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=alt-box]', state: 'hidden' } },
  { wait: 400 },
  // Each segment names a state outright, so a pass resumed anywhere lands the same.
  { moveTo: '[data-part=seg-loading]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=slot][data-state=loading]', state: 'visible' } },
  { assert: { selector: '[data-part=shimmer]', state: 'visible' } },
  { assert: { selector: '[data-part=image]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-broken]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=slot][data-state=broken]', state: 'visible' } },
  { assert: { selector: '[data-part=shimmer]', state: 'hidden' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-loaded]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=slot][data-state=loaded]', state: 'visible' } },
  { assert: { selector: '[data-part=note]', state: 'visible' } },
  { wait: 800 },
]);
