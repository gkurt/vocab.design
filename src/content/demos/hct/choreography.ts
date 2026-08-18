import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for them to land.
  { wait: 420 },
  { assert: { selector: '[data-part=swatch][data-tone="40"]', state: 'visible' } },
  { assert: { selector: '[data-part=swatch][data-contrast="6.46"]', state: 'visible' } },
  { assert: { selector: '[data-part=read]', state: 'visible' } },
  { wait: 1100 },
  // Hue, walked most of the way round the circle. Absolute stops, so a pass picked up
  // anywhere lands on the same value (SPEC §8).
  { moveTo: '[data-part=hue-thumb]' },
  { drag: { to: '[data-part=hue-30]' } },
  { wait: 600 },
  { assert: { selector: '[data-part=swatch][data-hue="30"]', state: 'visible' } },
  // The colour changed and the ratio did not, to the hundredth.
  { assert: { selector: '[data-part=swatch][data-contrast="6.46"]', state: 'visible' } },
  { wait: 1100 },
  // Chroma, pushed to the edge of sRGB. Same ratio again.
  { moveTo: '[data-part=chroma-thumb]' },
  { drag: { to: '[data-part=chroma-20]' } },
  { wait: 600 },
  { assert: { selector: '[data-part=swatch][data-contrast="6.46"]', state: 'visible' } },
  { assert: { selector: '[data-part=chroma-value]', state: 'visible' } },
  { wait: 1100 },
  // Tone is the axis that moves it, and it moves it predictably.
  { moveTo: '[data-part=tone-thumb]' },
  { drag: { to: '[data-part=tone-60]' } },
  { wait: 600 },
  { assert: { selector: '[data-part=swatch][data-tone="60"]', state: 'visible' } },
  { assert: { selector: '[data-part=swatch][data-contrast="3.17"]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=tone-thumb]' },
  { drag: { to: '[data-part=tone-20]' } },
  { wait: 600 },
  { assert: { selector: '[data-part=swatch][data-tone="20"]', state: 'visible' } },
  { assert: { selector: '[data-part=swatch][data-contrast="13.14"]', state: 'visible' } },
  { wait: 900 },
]);
