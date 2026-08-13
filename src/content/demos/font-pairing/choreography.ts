import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=specimen][data-pairing="paired"]', state: 'visible' } },
  { assert: { selector: '[data-part=display]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { wait: 1400 },
  // Absolute states, not a flip: the pass reaches "clashing" and then reaches
  // "paired" again, so it reads the same wherever it is picked up (SPEC §8).
  { moveTo: '[data-part=seg-clashing]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=specimen][data-pairing="clashing"]', state: 'visible' } },
  { assert: { selector: '[data-part=names-text]', state: 'visible' } },
  { wait: 1800 },
  { moveTo: '[data-part=seg-paired]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=specimen][data-pairing="paired"]', state: 'visible' } },
  { wait: 1200 },
]);
