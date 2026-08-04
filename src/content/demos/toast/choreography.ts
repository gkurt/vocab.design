import { steps } from '#src/stage/choreography.ts';

export default steps([
  { moveTo: '[data-part=save-button]' },
  { click: true },
  { assert: { selector: '[data-part=toast]', state: 'visible' } },
  { wait: 2600 },
  { assert: { selector: '[data-part=toast]', state: 'hidden' } },
]);
