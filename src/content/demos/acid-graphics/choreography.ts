import { steps } from '#src/stage/choreography.ts';

// A poster is looked at, not operated: nothing here answers a pointer, so the pass
// waits and states the motifs instead of touring them with a cursor (SPEC §8).
export default steps([
  { wait: 450 },
  { assert: { selector: '[data-part=poster]', state: 'visible' } },
  { assert: { selector: '[data-part=title]', state: 'visible' } },
  { assert: { selector: '[data-part=checker]', state: 'visible' } },
  { wait: 1000 },
  { assert: { selector: '[data-part=smiley]', state: 'visible' } },
  { assert: { selector: '[data-part=globe]', state: 'visible' } },
  { assert: { selector: '[data-part=sticker]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=rings]', state: 'visible' } },
  { assert: { selector: '[data-part=foot]', state: 'visible' } },
  { wait: 1400 },
]);
