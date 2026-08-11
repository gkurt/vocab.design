import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=maximal]', state: 'visible' } },
  { assert: { selector: '[data-part=sticker]', state: 'visible' } },
  { assert: { selector: '[data-part=extra]', state: 'hidden' } },
  { moveTo: '[data-part=plain]' },
  { wait: 800 },
  { moveTo: '[data-part=pile]' },
  { wait: 500 },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=extra]', state: 'visible' } },
  { wait: 1200 },
]);
