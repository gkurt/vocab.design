import { steps } from '#src/stage/choreography.ts';

// A dialog from 2001, drawn at rest: the gloss is the whole claim and none of it
// answers a pointer, so the pass states the parts instead of pointing at them.
export default steps([
  { wait: 450 },
  { assert: { selector: '[data-part=window]', state: 'visible' } },
  { assert: { selector: '[data-part=titlebar]', state: 'visible' } },
  { assert: { selector: '[data-part=lights]', state: 'visible' } },
  { wait: 1000 },
  { assert: { selector: '[data-part=pinstripes]', state: 'visible' } },
  { assert: { selector: '[data-part=scrollbar]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=gel-cancel]', state: 'visible' } },
  { assert: { selector: '[data-part=gel-default]', state: 'visible' } },
  { wait: 1300 },
]);
