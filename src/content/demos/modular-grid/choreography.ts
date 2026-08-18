import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 700 },
  // Four columns crossed by three fields, with the modules drawn.
  { assert: { selector: '[data-part=page][data-config=coarse]', state: 'visible' } },
  { assert: { selector: '[data-part=modules]', state: 'visible' } },
  { assert: { selector: '[data-part=block-image]', state: 'visible' } },
  { wait: 1000 },
  // A finer field: the same five blocks restated in six by four.
  { moveTo: '[data-part=seg-fine]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=page][data-config=fine]', state: 'visible' } },
  { assert: { selector: '[data-part=modules]', state: 'visible' } },
  { assert: { selector: '[data-part=block-lede]', state: 'visible' } },
  { wait: 1400 },
  // The modules undrawn, with every block still placed in them.
  { moveTo: '[data-part=seg-page]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=page][data-config=page]', state: 'visible' } },
  { assert: { selector: '[data-part=modules]', state: 'hidden' } },
  { assert: { selector: '[data-part=block-image]', state: 'visible' } },
  { wait: 1400 },
  // Back to the coarse field.
  { moveTo: '[data-part=seg-coarse]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=page][data-config=coarse]', state: 'visible' } },
  { assert: { selector: '[data-part=modules]', state: 'visible' } },
  { wait: 800 },
]);
