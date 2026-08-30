import { steps } from '#src/stage/choreography.ts';

// A measurement answers no pointer. The ruling, the band between the capital and the
// ascender, the key and the numbers are all drawn at mount, so the pass states them.
export default steps([
  { wait: 450 },
  { assert: { selector: '[data-part=ruled]', state: 'visible' } },
  { assert: { selector: '[data-part=specimen]', state: 'visible' } },
  { assert: { selector: '[data-part=band]', state: 'visible' } },
  { wait: 1200 },
  { assert: { selector: '[data-part=legend]', state: 'visible' } },
  { assert: { selector: '[data-part=metrics]', state: 'visible' } },
  { wait: 1200 },
]);
