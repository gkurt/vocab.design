import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=card]', state: 'visible' } },
  { assert: { selector: '[data-part=titlebar]', state: 'visible' } },
  { assert: { selector: '[data-part=sun]', state: 'visible' } },
  { assert: { selector: '[data-part=grid]', state: 'visible' } },
  { assert: { selector: '[data-part=bust]', state: 'visible' } },
  { wait: 800 },
  // A costume answers no pointer: the cursor reads the parts list in order, the chrome
  // wordmark, the horizon grid, the bust, and the window frame it is all sitting in.
  { moveTo: '[data-part=wordmark]' },
  { wait: 1000 },
  { moveTo: '[data-part=grid]' },
  { wait: 900 },
  { moveTo: '[data-part=bust]' },
  { wait: 900 },
  { moveTo: '[data-part=titlebar]' },
  { wait: 800 },
  { assert: { selector: '[data-part=wordmark]', state: 'visible' } },
  { assert: { selector: '[data-part=kana]', state: 'visible' } },
  { wait: 600 },
]);
