import { steps } from '#src/stage/choreography.ts';

// A poster answers no pointer: the three shapes, the diagonal and the flush left
// title are all on stage from mount, so the pass asserts them (SPEC §8).
export default steps([
  { wait: 450 },
  { assert: { selector: '[data-part=poster]', state: 'visible' } },
  { assert: { selector: '[data-part=composition]', state: 'visible' } },
  { assert: { selector: '[data-part=title]', state: 'visible' } },
  { wait: 1000 },
  { assert: { selector: '[data-part=square]', state: 'visible' } },
  { assert: { selector: '[data-part=circle]', state: 'visible' } },
  { assert: { selector: '[data-part=triangle]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=diagonal]', state: 'visible' } },
  { assert: { selector: '[data-part=rule]', state: 'visible' } },
  { assert: { selector: '[data-part=foot]', state: 'visible' } },
  { wait: 1200 },
]);
