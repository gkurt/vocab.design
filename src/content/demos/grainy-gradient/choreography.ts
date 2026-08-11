import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 600 },
  { assert: { selector: '[data-part=panel][data-grain=fine]', state: 'visible' } },
  { assert: { selector: '[data-part=grain]', state: 'visible' } },
  { moveTo: '[data-part=grain-none]' },
  { wait: 450 },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=panel][data-grain=none]', state: 'visible' } },
  { assert: { selector: '[data-part=grain]', state: 'hidden' } },
  { moveTo: '[data-part=grain-coarse]' },
  { wait: 450 },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=panel][data-grain=coarse]', state: 'visible' } },
  { assert: { selector: '[data-part=grain]', state: 'visible' } },
  { wait: 1000 },
]);
