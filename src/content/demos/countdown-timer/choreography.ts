import { steps } from '#src/stage/choreography.ts';

// The clock runs itself and nothing here answers a pointer, so the pass waits the
// countdown out and states what changed when it crossed the hour (SPEC §8).
export default steps([
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  // Above the hour: still just a fact being reported.
  { assert: { selector: '[data-part=readout][data-zone="warn"]', state: 'hidden' } },
  { wait: 2000 },
  { assert: { selector: '[data-part=readout][data-zone="warn"]', state: 'hidden' } },
  { wait: 3600 },
  // Crossed the hour: the hue changed and so did the sentence under it.
  { assert: { selector: '[data-part=readout][data-zone="warn"]', state: 'visible' } },
  { assert: { selector: '[data-part=consequence]', state: 'visible' } },
  { wait: 1400 },
]);
