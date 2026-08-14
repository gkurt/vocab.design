import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=poster]', state: 'visible' } },
  { assert: { selector: '[data-part=frame]', state: 'visible' } },
  { assert: { selector: '[data-part=title]', state: 'visible' } },
  { wait: 700 },
  // A drawn poster answers no pointer: the cursor follows the line the eye follows.
  { moveTo: '[data-part=title]' },
  { wait: 1000 },
  { moveTo: '[data-part=flower]' },
  { wait: 900 },
  { assert: { selector: '[data-part=flower]', state: 'visible' } },
  { moveTo: '[data-part=stems]' },
  { wait: 900 },
  { assert: { selector: '[data-part=stems]', state: 'visible' } },
  { moveTo: '[data-part=foot]' },
  { wait: 800 },
  { assert: { selector: '[data-part=leaves]', state: 'visible' } },
  { wait: 600 },
]);
