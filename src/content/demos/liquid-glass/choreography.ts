import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=bar]', state: 'visible' } },
  { moveTo: '[data-part=tab-search]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=tab-search][data-current]', state: 'visible' } },
  { moveTo: '[data-part=tab-albums]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=tab-albums][data-current]', state: 'visible' } },
  { assert: { selector: '[data-part=tab-search][data-current]', state: 'hidden' } },
  { wait: 900 },
]);
