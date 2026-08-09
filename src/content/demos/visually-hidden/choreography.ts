import { steps } from '#src/stage/choreography.ts';

export default steps([
  { moveTo: '[data-part=labelled]' },
  { click: true },
  { wait: 1200 },
  { moveTo: '[data-part=unlabelled]' },
  { click: true },
  { wait: 1200 },
  { moveTo: '[data-part=reveal]' },
  { click: true },
  { assert: { selector: '[data-part=label][data-revealed]', state: 'visible' } },
  { wait: 1600 },
  { click: true },
  { assert: { selector: '[data-part=label][data-revealed]', state: 'hidden' } },
  { wait: 800 },
]);
