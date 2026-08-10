import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=grid][data-mode=bento]', state: 'visible' } },
  { moveTo: '[data-part=seg-uniform]' },
  { click: true },
  // The same six cells, the same field: only the sizing has stopped being deliberate.
  { assert: { selector: '[data-part=grid][data-mode=uniform]', state: 'visible' } },
  { wait: 1500 },
  { moveTo: '[data-part=seg-bento]' },
  { click: true },
  { assert: { selector: '[data-part=grid][data-mode=bento]', state: 'visible' } },
  { wait: 1400 },
]);
