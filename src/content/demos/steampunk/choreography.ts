import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=panel]', state: 'visible' } },
  { assert: { selector: '[data-part=gauge]', state: 'visible' } },
  { assert: { selector: '[data-part=needle]', state: 'visible' } },
  { wait: 700 },
  // Nothing here moves: the cursor reads the panel instrument by instrument.
  { moveTo: '[data-part=plate]' },
  { wait: 900 },
  { moveTo: '[data-part=gauge]' },
  { wait: 1000 },
  { moveTo: '[data-part=wheel]' },
  { wait: 900 },
  { assert: { selector: '[data-part=wheel]', state: 'visible' } },
  { moveTo: '[data-part=levers]' },
  { wait: 900 },
  { assert: { selector: '[data-part=levers]', state: 'visible' } },
  { moveTo: '[data-part=foot]' },
  { wait: 800 },
  { assert: { selector: '[data-part=plate]', state: 'visible' } },
  { wait: 600 },
]);
