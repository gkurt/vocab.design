import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=panel]', state: 'visible' } },
  { assert: { selector: '[data-part=title]', state: 'visible' } },
  { assert: { selector: '[data-part=warning]', state: 'visible' } },
  { wait: 700 },
  // A hostile terminal answers no pointer: the cursor reads the chrome instead.
  { moveTo: '[data-part=header]' },
  { wait: 700 },
  { moveTo: '[data-part=title]' },
  { wait: 900 },
  { moveTo: '[data-part=meter-a]' },
  { wait: 800 },
  { moveTo: '[data-part=warning]' },
  { wait: 800 },
  { moveTo: '[data-part=jack]' },
  { wait: 900 },
  { assert: { selector: '[data-part=meter-a]', state: 'visible' } },
  { assert: { selector: '[data-part=meter-b]', state: 'visible' } },
  { assert: { selector: '[data-part=serial]', state: 'visible' } },
  { assert: { selector: '[data-part=jack]', state: 'visible' } },
  { wait: 600 },
]);
