import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=advanced]', state: 'hidden' } },
  { moveTo: '[data-part=toggle]' },
  { click: true },
  { assert: { selector: '[data-part=advanced]', state: 'visible' } },
  { assert: { selector: '[data-part=toggle][aria-expanded="true"]', state: 'visible' } },
  { wait: 1600 },
  { click: true },
  { assert: { selector: '[data-part=advanced]', state: 'hidden' } },
  { wait: 800 },
]);
