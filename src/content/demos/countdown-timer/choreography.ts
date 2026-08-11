import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  // Above the hour: still just a fact being reported.
  { assert: { selector: '[data-part=readout][data-zone="warn"]', state: 'hidden' } },
  { moveTo: '[data-part=readout]' },
  { wait: 2000 },
  { assert: { selector: '[data-part=readout][data-zone="warn"]', state: 'hidden' } },
  { wait: 3600 },
  // Crossed the hour: the hue changed and so did the sentence under it.
  { assert: { selector: '[data-part=readout][data-zone="warn"]', state: 'visible' } },
  { moveTo: '[data-part=basket]' },
  { wait: 1400 },
]);
