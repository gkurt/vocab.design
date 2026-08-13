import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=poster]', state: 'visible' } },
  { assert: { selector: '[data-part=composition]', state: 'visible' } },
  { assert: { selector: '[data-part=title]', state: 'visible' } },
  { wait: 800 },
  // A poster answers no pointer: the cursor names the three shapes, then the diagonal
  // that keeps them from sitting still, then the flush left title.
  { moveTo: '[data-part=square]' },
  { wait: 800 },
  { moveTo: '[data-part=circle]' },
  { wait: 800 },
  { moveTo: '[data-part=triangle]' },
  { wait: 800 },
  { moveTo: '[data-part=title]' },
  { wait: 800 },
  { assert: { selector: '[data-part=diagonal]', state: 'visible' } },
  { assert: { selector: '[data-part=rule]', state: 'visible' } },
  { assert: { selector: '[data-part=foot]', state: 'visible' } },
  { wait: 600 },
]);
