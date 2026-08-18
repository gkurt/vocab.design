import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 700 },
  // Mount: the wide template, three columns, all five named regions placed.
  { assert: { selector: '[data-part=grid][data-template=wide]', state: 'visible' } },
  { assert: { selector: '[data-part=area-nav]', state: 'visible' } },
  { assert: { selector: '[data-part=listing]', state: 'visible' } },
  { wait: 1000 },
  // Two columns: the container is restated and aside moves under main.
  { moveTo: '[data-part=seg-medium]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=grid][data-template=medium]', state: 'visible' } },
  { assert: { selector: '[data-part=area-side]', state: 'visible' } },
  { wait: 1300 },
  // One column, with nav drawn near the bottom while its order badge stays at two.
  { moveTo: '[data-part=seg-narrow]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=grid][data-template=narrow]', state: 'visible' } },
  { assert: { selector: '[data-part=order-nav]', state: 'visible' } },
  { assert: { selector: '[data-part=area-foot]', state: 'visible' } },
  { wait: 1400 },
  // Back to the wide template.
  { moveTo: '[data-part=seg-wide]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=grid][data-template=wide]', state: 'visible' } },
  { wait: 800 },
]);
