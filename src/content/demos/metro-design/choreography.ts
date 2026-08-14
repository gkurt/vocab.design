import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=panel]', state: 'visible' } },
  { assert: { selector: '[data-part=title]', state: 'visible' } },
  { assert: { selector: '[data-part=tiles]', state: 'visible' } },
  { wait: 700 },
  // Nothing here opens: the cursor reads the heading, then the blocks it sits over.
  { moveTo: '[data-part=title]' },
  { wait: 1000 },
  { moveTo: '[data-part=tile-mail]' },
  { wait: 800 },
  { assert: { selector: '[data-part=tile-mail]', state: 'visible' } },
  { moveTo: '[data-part=tile-people]' },
  { wait: 900 },
  { assert: { selector: '[data-part=tile-people]', state: 'visible' } },
  { moveTo: '[data-part=tile-agenda]' },
  { wait: 800 },
  { moveTo: '[data-part=subtitle]' },
  { wait: 800 },
  { assert: { selector: '[data-part=subtitle]', state: 'visible' } },
  { wait: 600 },
]);
