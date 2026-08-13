import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=card]', state: 'visible' } },
  { assert: { selector: '[data-part=zigzag]', state: 'visible' } },
  { assert: { selector: '[data-part=terrazzo]', state: 'visible' } },
  { wait: 800 },
  // A pattern answers no pointer: the cursor reads the parts list, squiggle, zigzag,
  // terrazzo, stripes.
  { moveTo: '[data-part=squiggle]' },
  { wait: 900 },
  { moveTo: '[data-part=zigzag]' },
  { wait: 800 },
  { moveTo: '[data-part=terrazzo]' },
  { wait: 900 },
  { moveTo: '[data-part=stripes]' },
  { wait: 800 },
  { assert: { selector: '[data-part=squiggle]', state: 'visible' } },
  { assert: { selector: '[data-part=stripes]', state: 'visible' } },
  { assert: { selector: '[data-part=title]', state: 'visible' } },
  { wait: 600 },
]);
