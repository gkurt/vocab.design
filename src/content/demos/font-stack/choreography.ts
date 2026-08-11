import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=entry-0][data-current]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=seg-first]' },
  { click: true },
  { wait: 400 },
  // The first name is struck out and the second one is now the face in force.
  { assert: { selector: '[data-part=entry-1][data-current]', state: 'visible' } },
  { assert: { selector: '[data-part=declaration][data-missing=first]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-two]' },
  { click: true },
  { wait: 400 },
  // The chain has run out of named faces and landed on the generic.
  { assert: { selector: '[data-part=entry-2][data-current]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-none]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=entry-0][data-current]', state: 'visible' } },
  { wait: 900 },
]);
