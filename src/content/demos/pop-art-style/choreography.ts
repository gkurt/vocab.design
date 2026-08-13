import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=card]', state: 'visible' } },
  { assert: { selector: '[data-part=burst]', state: 'visible' } },
  { assert: { selector: '[data-part=balloon]', state: 'visible' } },
  { wait: 800 },
  // A printed panel answers no pointer: the cursor reads it the way an eye does,
  // repeats, badge, balloon, tail.
  { moveTo: '[data-part=repeats]' },
  { wait: 900 },
  { moveTo: '[data-part=burst]' },
  { wait: 800 },
  { moveTo: '[data-part=balloon]' },
  { wait: 900 },
  { assert: { selector: '[data-part=repeats]', state: 'visible' } },
  { assert: { selector: '[data-part=tail]', state: 'visible' } },
  { wait: 600 },
]);
