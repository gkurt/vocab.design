import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=scale][data-ratio="1.2"]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=seg-133]' },
  { click: true },
  { assert: { selector: '[data-part=scale][data-ratio="1.333"]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=seg-150]' },
  { click: true },
  { assert: { selector: '[data-part=scale][data-ratio="1.5"]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=seg-120]' },
  { click: true },
  { assert: { selector: '[data-part=scale][data-ratio="1.2"]', state: 'visible' } },
  { wait: 900 },
]);
