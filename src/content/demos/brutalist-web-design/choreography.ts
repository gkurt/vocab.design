import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=fragment]', state: 'visible' } },
  { assert: { selector: '[data-part=link-archive][data-visited]', state: 'hidden' } },
  { moveTo: '[data-part=link-archive]' },
  { wait: 500 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=link-archive][data-visited]', state: 'visible' } },
  { moveTo: '[data-part=caption]' },
  { wait: 1100 },
]);
