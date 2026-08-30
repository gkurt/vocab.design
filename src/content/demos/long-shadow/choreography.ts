import { steps } from '#src/stage/choreography.ts';

// Two absolute presets, so no step depends on the state it finds (SPEC §8). Taking the
// shadow away is the comparison: what is left is the flat tile the era decorated.
export default steps([
  { assert: { selector: '[data-part=tile][data-shadow="long"]', state: 'visible' } },
  { assert: { selector: '[data-part=seg-long][data-selected]', state: 'visible' } },
  { wait: 1000 },
  { moveTo: '[data-part=seg-none]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=tile][data-shadow="none"]', state: 'visible' } },
  { assert: { selector: '[data-part=seg-none][data-selected]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=seg-long]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=tile][data-shadow="long"]', state: 'visible' } },
  { assert: { selector: '[data-part=glyph]', state: 'visible' } },
  { wait: 1300 },
]);
