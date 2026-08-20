import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The frame fades in from mount, so the first reading of the two grids waits for it.
  { wait: 700 },
  { assert: { selector: '[data-part=shared]', state: 'visible' } },
  { assert: { selector: '[data-part=grid-four]', state: 'visible' } },
  { assert: { selector: '[data-part=block-feature][data-rhythm=four]', state: 'visible' } },
  { assert: { selector: '[data-part=block-ad][data-rhythm=four]', state: 'visible' } },
  { wait: 700 },

  // The same three blocks on the other rhythm: two edges move, the shared one does not.
  { moveTo: '[data-part=seg-six]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=block-feature][data-rhythm=six]', state: 'visible' } },
  { assert: { selector: '[data-part=block-notes][data-rhythm=six]', state: 'visible' } },
  { assert: { selector: '[data-part=shared]', state: 'visible' } },
  { wait: 900 },

  // Back to four, where the six-column lines stay drawn all the same.
  { moveTo: '[data-part=seg-four]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=block-notes][data-rhythm=four]', state: 'visible' } },
  { assert: { selector: '[data-part=grid-six]', state: 'visible' } },
  { wait: 700 },
]);
