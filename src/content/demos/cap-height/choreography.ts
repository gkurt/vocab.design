import { steps } from '#src/stage/choreography.ts';

// A measurement answers no pointer. Both squares are already sized against the word
// they sit beside, so the pass states the ruling and its consequence (SPEC §8).
export default steps([
  { wait: 450 },
  { assert: { selector: '[data-part=ruled]', state: 'visible' } },
  { assert: { selector: '[data-part=specimen]', state: 'visible' } },
  { wait: 1200 },
  { assert: { selector: '[data-part=cap-aligned]', state: 'visible' } },
  { assert: { selector: '[data-part=em-aligned]', state: 'visible' } },
  { wait: 1200 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 900 },
]);
