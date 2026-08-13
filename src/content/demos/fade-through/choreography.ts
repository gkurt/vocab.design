import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=slot][data-showing=library][data-state=settled]', state: 'visible' } },
  { moveTo: '[data-part=seg-alerts]' },
  { click: true },
  // Judged 350 ms in, which is inside the arrival: the view being left has already gone
  // entirely, and that empty middle is the whole term.
  { assert: { selector: '[data-part=slot][data-state=in]', state: 'visible' } },
  { assert: { selector: '[data-part=panel-library]', state: 'hidden' } },
  { wait: 700 },
  { assert: { selector: '[data-part=slot][data-showing=alerts][data-state=settled]', state: 'visible' } },
  { assert: { selector: '[data-part=panel-alerts]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=seg-account]' },
  { click: true },
  { assert: { selector: '[data-part=panel-alerts]', state: 'hidden' } },
  { wait: 800 },
  { assert: { selector: '[data-part=slot][data-showing=account][data-state=settled]', state: 'visible' } },
  { assert: { selector: '[data-part=panel-account]', state: 'visible' } },
  { wait: 600 },
]);
