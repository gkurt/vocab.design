import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=window]', state: 'visible' } },
  { assert: { selector: '[data-part=titlebar]', state: 'visible' } },
  { wait: 700 },
  // A dialog from 2001 answers no pointer here: the cursor names the gumdrops, the glass
  // scrollbar, and finally the one control in the row that was allowed to be blue.
  { moveTo: '[data-part=lights]' },
  { wait: 800 },
  { moveTo: '[data-part=scrollbar]' },
  { wait: 800 },
  { assert: { selector: '[data-part=pinstripes]', state: 'visible' } },
  { moveTo: '[data-part=gel-cancel]' },
  { wait: 700 },
  { moveTo: '[data-part=gel-default]' },
  { wait: 800 },
  { assert: { selector: '[data-part=gel-default]', state: 'visible' } },
  { assert: { selector: '[data-part=scrollbar]', state: 'visible' } },
  { wait: 600 },
]);
