import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=old-price]', state: 'visible' } },
  { assert: { selector: '[data-part=new-price]', state: 'visible' } },
  { wait: 800 },
  // A static comparison answers no pointer: the cursor reads the three jobs in turn.
  { moveTo: '[data-part=price-row]' },
  { wait: 1000 },
  { moveTo: '[data-part=task]' },
  { wait: 1000 },
  { assert: { selector: '[data-part=task]', state: 'visible' } },
  { moveTo: '[data-part=tracked]' },
  { wait: 1000 },
  { assert: { selector: '[data-part=tracked]', state: 'visible' } },
]);
