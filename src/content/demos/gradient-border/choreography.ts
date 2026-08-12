import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 600 },
  { assert: { selector: '[data-part=card][data-edge=conic]', state: 'visible' } },
  { assert: { selector: '[data-part=plain]', state: 'visible' } },
  { moveTo: '[data-part=card]' },
  { wait: 900 },
  { moveTo: '[data-part=seg-linear]' },
  { wait: 500 },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=card][data-edge=linear]', state: 'visible' } },
  { assert: { selector: '[data-part=seg-linear][aria-selected="true"]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-conic]' },
  { wait: 400 },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=card][data-edge=conic]', state: 'visible' } },
  { wait: 700 },
]);
