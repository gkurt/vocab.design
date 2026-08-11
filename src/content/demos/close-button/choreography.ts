import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=panel]', state: 'visible' } },
  { moveTo: '[data-part=close]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=panel]', state: 'hidden' } },
  { moveTo: '[data-part=show-filters]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=close]', state: 'visible' } },
]);
