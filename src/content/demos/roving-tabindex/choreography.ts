import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Exactly one zero in the group, which is the invariant the technique rests on.
  { assert: { selector: '[data-part=item-left][tabindex="0"]', state: 'visible' } },
  { assert: { selector: '[data-part=item-center][tabindex="-1"]', state: 'visible' } },
  { moveTo: '[data-part=toolbar]' },
  { wait: 500 },
  { press: 'ArrowRight' },
  { wait: 500 },
  // The zero moved with the arrow, and the item it left is out of the tab order again.
  { assert: { selector: '[data-part=item-center][tabindex="0"]', state: 'visible' } },
  { assert: { selector: '[data-part=item-left][tabindex="-1"]', state: 'visible' } },
  { wait: 500 },
  { press: 'End' },
  { wait: 500 },
  { assert: { selector: '[data-part=item-justify][tabindex="0"]', state: 'visible' } },
  { wait: 400 },
  // The roving position is real: Enter runs the command the zero is sitting on.
  { press: 'Enter' },
  { wait: 500 },
  { assert: { selector: '[data-part=sample][data-align=justify]', state: 'visible' } },
  { wait: 800 },
  { press: 'Home' },
  { wait: 500 },
  { assert: { selector: '[data-part=item-left][tabindex="0"]', state: 'visible' } },
  { assert: { selector: '[data-part=item-justify][tabindex="-1"]', state: 'visible' } },
  { wait: 900 },
]);
