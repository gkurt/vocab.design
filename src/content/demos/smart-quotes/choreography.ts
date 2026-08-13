import { steps } from '#src/stage/choreography.ts';

export default steps([
  // At rest the sentence is already stored the way a typesetter would want it.
  { assert: { selector: '[data-part=stored][data-quotes=curly]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=clear]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=stored][data-quotes=none]', state: 'hidden' } },
  { moveTo: '[data-part=editor]' },
  { click: true },
  { wait: 300 },
  { type: 'He said "it\'s fine."' },
  { wait: 700 },
  // Every mark was substituted as its character landed, and the apostrophe came out
  // as the closing single quote rather than the opening one.
  { assert: { selector: '[data-part=stored][data-quotes=curly]', state: 'visible' } },
  { assert: { selector: '[data-part=raw]', state: 'visible' } },
  { wait: 1000 },
]);
