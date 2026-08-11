import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 600 },
  { moveTo: '[data-part=button]' },
  { click: true },
  { assert: { selector: '[data-part=button][data-pressed]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=button][data-pressed]', state: 'hidden' } },
  { assert: { selector: '[data-part=card]', state: 'visible' } },
  { wait: 900 },
]);
