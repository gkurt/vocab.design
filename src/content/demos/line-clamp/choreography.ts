import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=clamped][data-lines="2"]', state: 'visible' } },
  { assert: { selector: '[data-part=full]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=seg-1]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=clamped][data-lines="1"]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-3]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=clamped][data-lines="3"]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-2]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=clamped][data-lines="2"]', state: 'visible' } },
  { wait: 900 },
]);
