import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=poster]', state: 'visible' } },
  { assert: { selector: '[data-part=title]', state: 'visible' } },
  { assert: { selector: '[data-part=checker]', state: 'visible' } },
  { wait: 700 },
  // A poster answers no pointer: the cursor only reads it, motif by motif.
  { moveTo: '[data-part=title]' },
  { wait: 1000 },
  { moveTo: '[data-part=smiley]' },
  { wait: 900 },
  { assert: { selector: '[data-part=smiley]', state: 'visible' } },
  { moveTo: '[data-part=globe]' },
  { wait: 900 },
  { assert: { selector: '[data-part=globe]', state: 'visible' } },
  { moveTo: '[data-part=sticker]' },
  { wait: 900 },
  { moveTo: '[data-part=foot]' },
  { wait: 800 },
  { assert: { selector: '[data-part=rings]', state: 'visible' } },
  { assert: { selector: '[data-part=foot]', state: 'visible' } },
  { wait: 600 },
]);
