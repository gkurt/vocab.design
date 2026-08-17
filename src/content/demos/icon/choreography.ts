import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The panel fades in from mount, so the first claims are made after it lands.
  { wait: 700 },
  { assert: { selector: '[data-part=row][data-size="20"]', state: 'visible' } },
  { assert: { selector: '[data-part=glyph-delete]', state: 'visible' } },
  { assert: { selector: '[data-part=magnified]', state: 'visible' } },
  { wait: 600 },
  // Each segment names a size step outright, so a pass resumed anywhere reads the same.
  { moveTo: '[data-part=seg-16]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=row][data-size="16"]', state: 'visible' } },
  { assert: { selector: '[data-part=glyph-delete]', state: 'visible' } },
  { wait: 1100 },
  { moveTo: '[data-part=seg-24]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=row][data-size="24"]', state: 'visible' } },
  { assert: { selector: '[data-part=glyph-search]', state: 'visible' } },
  { wait: 1100 },
  { moveTo: '[data-part=seg-20]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=row][data-size="20"]', state: 'visible' } },
  { assert: { selector: '[data-part=note]', state: 'visible' } },
  { wait: 800 },
]);
