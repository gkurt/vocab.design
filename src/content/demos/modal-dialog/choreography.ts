import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=dialog]', state: 'hidden' } },
  { moveTo: '[data-part=open]' },
  { click: true },
  { assert: { selector: '[data-part=dialog]', state: 'visible' } },
  { assert: { selector: '[data-part=scrim]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=cancel]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=dialog]', state: 'hidden' } },
]);
