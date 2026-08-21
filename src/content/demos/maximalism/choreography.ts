import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=maximal]', state: 'visible' } },
  { assert: { selector: '[data-part=sticker]', state: 'visible' } },
  { assert: { selector: '[data-part=extra]', state: 'hidden' } },
  // The restrained version beside it is scenery the pass names rather than points at.
  { assert: { selector: '[data-part=plain]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=pile]' },
  { wait: 500 },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=extra]', state: 'visible' } },
  { wait: 1200 },
]);
