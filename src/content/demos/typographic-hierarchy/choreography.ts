import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=column][data-levels=on]', state: 'visible' } },
  { assert: { selector: '[data-part=text-title]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-flat]' },
  { click: true },
  { wait: 500 },
  // Same words, same order, no ranks: everything is still there and nothing is signposted.
  { assert: { selector: '[data-part=column][data-levels=off]', state: 'visible' } },
  { assert: { selector: '[data-part=text-caption]', state: 'visible' } },
  { wait: 1600 },
  { moveTo: '[data-part=seg-levels]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=column][data-levels=on]', state: 'visible' } },
  { wait: 900 },
]);
