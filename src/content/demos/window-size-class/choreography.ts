import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 700 },
  // 412dp: the narrowest pick, and the read-out names the bucket rather than the number.
  { assert: { selector: '[data-part=window][data-dp="412"][data-class=compact]', state: 'visible' } },
  { assert: { selector: '[data-part=grid][data-columns="1"]', state: 'visible' } },
  { assert: { selector: '[data-part=class-name]', state: 'visible' } },
  { wait: 900 },
  // A different width, the same class: the layout inside must not change at all.
  { moveTo: '[data-part=seg-w560]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=window][data-dp="560"][data-class=compact]', state: 'visible' } },
  { assert: { selector: '[data-part=grid][data-columns="1"]', state: 'visible' } },
  { wait: 1100 },
  // Crossing 600dp is what changes the arrangement, once.
  { moveTo: '[data-part=seg-w720]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=window][data-dp="720"][data-class=medium]', state: 'visible' } },
  { assert: { selector: '[data-part=grid][data-columns="2"]', state: 'visible' } },
  { wait: 1100 },
  { moveTo: '[data-part=seg-w960]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=window][data-dp="960"][data-class=expanded]', state: 'visible' } },
  { assert: { selector: '[data-part=grid][data-columns="3"]', state: 'visible' } },
  { wait: 1200 },
  // Back to the narrowest by naming it, since the widths are a choice and not a cycle.
  { moveTo: '[data-part=seg-w412]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=window][data-dp="412"][data-class=compact]', state: 'visible' } },
  { assert: { selector: '[data-part=grid][data-columns="1"]', state: 'visible' } },
  { wait: 800 },
]);
