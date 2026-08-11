import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=list]', state: 'hidden' } },
  { moveTo: '[data-part=trigger]' },
  { click: true },
  { wait: 320 },
  { assert: { selector: '[data-part=list]', state: 'visible' } },
  { assert: { selector: '[data-part=trigger][aria-expanded="true"]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=opt-poster]' },
  { click: true },
  { wait: 420 },
  { assert: { selector: '[data-part=list]', state: 'hidden' } },
  { assert: { selector: '[data-part=trigger][data-value=poster]', state: 'visible' } },
  { wait: 900 },
]);
