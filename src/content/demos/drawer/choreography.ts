import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=drawer]', state: 'hidden' } },
  { moveTo: '[data-part=open]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=drawer]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=close]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=drawer]', state: 'hidden' } },
]);
