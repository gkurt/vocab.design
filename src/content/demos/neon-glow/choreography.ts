import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=sign][data-lit=neon]', state: 'visible' } },
  { assert: { selector: '[data-part=wordmark]', state: 'visible' } },
  { moveTo: '[data-part=pick-flat]' },
  { wait: 450 },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=sign][data-lit=flat]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=pick-neon]' },
  { wait: 400 },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=sign][data-lit=neon]', state: 'visible' } },
  { wait: 900 },
]);
