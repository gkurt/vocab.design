import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 320 },
  { assert: { selector: '[data-part=panel]', state: 'hidden' } },
  { moveTo: '[data-part=trigger]' },
  { click: true },
  { wait: 340 },
  { assert: { selector: '[data-part=panel]', state: 'visible' } },
  { assert: { selector: '[data-part=trigger][aria-expanded="true"]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=opt-priority]' },
  { wait: 300 },
  { click: true },
  { wait: 440 },
  { assert: { selector: '[data-part=panel]', state: 'hidden' } },
  { assert: { selector: '[data-part=trigger][data-value=priority]', state: 'visible' } },
  { wait: 900 },
]);
