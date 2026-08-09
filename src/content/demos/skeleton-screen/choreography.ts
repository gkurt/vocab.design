import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=skeleton]', state: 'visible' } },
  { assert: { selector: '[data-part=content]', state: 'hidden' } },
  { wait: 900 },
  { moveTo: '[data-part=reload]' },
  { click: true },
  { assert: { selector: '[data-part=skeleton]', state: 'visible' } },
  { wait: 1900 },
  { assert: { selector: '[data-part=content]', state: 'visible' } },
  { assert: { selector: '[data-part=skeleton]', state: 'hidden' } },
  { wait: 900 },
]);
