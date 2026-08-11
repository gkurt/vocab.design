import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 600 },
  { assert: { selector: '[data-part=illustration][data-palette=coral]', state: 'visible' } },
  { moveTo: '[data-part=pal-mint]' },
  { wait: 450 },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=illustration][data-palette=mint]', state: 'visible' } },
  { moveTo: '[data-part=pal-plum]' },
  { wait: 450 },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=illustration][data-palette=plum]', state: 'visible' } },
  { wait: 1000 },
]);
