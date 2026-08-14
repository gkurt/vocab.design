import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=column][data-breaks="auto"]', state: 'visible' } },
  { assert: { selector: '[data-part=tint]', state: 'visible' } },
  { wait: 1200 },
  // Named states rather than a flip, so the pass reads the same wherever it is
  // picked up (SPEC §8).
  { moveTo: '[data-part=seg-tuned]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=column][data-breaks="tuned"]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { wait: 1800 },
  { moveTo: '[data-part=seg-auto]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=column][data-breaks="auto"]', state: 'visible' } },
  { wait: 1200 },
]);
