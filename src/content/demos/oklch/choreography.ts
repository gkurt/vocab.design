import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=oklch][data-view="color"]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=seg-lightness]' },
  { click: true },
  // Each segment names an absolute view, so a pass resumed anywhere still lands here.
  { assert: { selector: '[data-part=oklch][data-view="lightness"]', state: 'visible' } },
  { assert: { selector: '[data-part=hsl][data-view="lightness"]', state: 'visible' } },
  { assert: { selector: '[data-part=seg-lightness][aria-selected="true"]', state: 'visible' } },
  { wait: 1800 },
  { moveTo: '[data-part=seg-color]' },
  { click: true },
  { assert: { selector: '[data-part=oklch][data-view="color"]', state: 'visible' } },
  { assert: { selector: '[data-part=seg-color][aria-selected="true"]', state: 'visible' } },
  { wait: 1200 },
]);
