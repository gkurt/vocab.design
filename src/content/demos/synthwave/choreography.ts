import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=poster]', state: 'visible' } },
  { assert: { selector: '[data-part=sun]', state: 'visible' } },
  { assert: { selector: '[data-part=grid]', state: 'visible' } },
  { wait: 800 },
  // A poster answers no pointer: the cursor drops from the sky to the vanishing point.
  { moveTo: '[data-part=stars]' },
  { wait: 800 },
  { moveTo: '[data-part=sun]' },
  { wait: 900 },
  { moveTo: '[data-part=title]' },
  { wait: 900 },
  { moveTo: '[data-part=grid]' },
  { wait: 800 },
  { assert: { selector: '[data-part=title]', state: 'visible' } },
  { assert: { selector: '[data-part=strip]', state: 'visible' } },
  { assert: { selector: '[data-part=mountains]', state: 'visible' } },
  { wait: 600 },
]);
