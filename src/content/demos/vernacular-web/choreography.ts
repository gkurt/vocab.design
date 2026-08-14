import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=page]', state: 'visible' } },
  { assert: { selector: '[data-part=heading]', state: 'visible' } },
  { assert: { selector: '[data-part=starburst]', state: 'visible' } },
  { wait: 700 },
  // Nothing here responds to a pointer: the cursor reads the page's furniture in turn.
  { moveTo: '[data-part=heading]' },
  { wait: 900 },
  { moveTo: '[data-part=links]' },
  { wait: 1000 },
  { assert: { selector: '[data-part=links]', state: 'visible' } },
  { moveTo: '[data-part=counter]' },
  { wait: 900 },
  { assert: { selector: '[data-part=counter]', state: 'visible' } },
  { moveTo: '[data-part=midi]' },
  { wait: 800 },
  { moveTo: '[data-part=badge]' },
  { wait: 800 },
  { assert: { selector: '[data-part=badge]', state: 'visible' } },
  { wait: 600 },
]);
