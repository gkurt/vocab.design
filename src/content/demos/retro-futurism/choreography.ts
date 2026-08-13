import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=poster]', state: 'visible' } },
  { assert: { selector: '[data-part=rocket]', state: 'visible' } },
  { assert: { selector: '[data-part=planet]', state: 'visible' } },
  { wait: 800 },
  // A poster answers no pointer: the cursor tours the props that date the drawing.
  { moveTo: '[data-part=rocket]' },
  { wait: 900 },
  { moveTo: '[data-part=planet]' },
  { wait: 800 },
  { moveTo: '[data-part=atom]' },
  { wait: 800 },
  { moveTo: '[data-part=title]' },
  { wait: 900 },
  { assert: { selector: '[data-part=atom]', state: 'visible' } },
  { assert: { selector: '[data-part=title]', state: 'visible' } },
  { assert: { selector: '[data-part=foot]', state: 'visible' } },
  { wait: 600 },
]);
