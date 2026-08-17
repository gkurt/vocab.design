import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The kit's surfaces fade in from mount, so the first claim waits for them to land.
  { wait: 420 },
  { assert: { selector: '[data-part=swatch-p3][data-hue=red]', state: 'visible' } },
  { assert: { selector: '[data-part=swatch-srgb]', state: 'visible' } },
  { assert: { selector: '[data-part=diagram]', state: 'visible' } },
  { wait: 1100 },
  { moveTo: '[data-part=seg-green]' },
  { click: true },
  { wait: 650 },
  // A different primary, the same pair of spaces, and the outline markers move to say
  // where in the chromaticity plane the two now disagree.
  { assert: { selector: '[data-part=swatch-p3][data-hue=green]', state: 'visible' } },
  { assert: { selector: '[data-part=code-p3]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-cyan]' },
  { click: true },
  { wait: 650 },
  { assert: { selector: '[data-part=swatch-p3][data-hue=cyan]', state: 'visible' } },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-red]' },
  { click: true },
  { wait: 650 },
  { assert: { selector: '[data-part=swatch-p3][data-hue=red]', state: 'visible' } },
  { wait: 900 },
]);
