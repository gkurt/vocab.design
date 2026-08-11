import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=title]', state: 'visible' } },
  { assert: { selector: '[data-part=band-top]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'hidden' } },
  { moveTo: '[data-part=corrupt]' },
  { wait: 500 },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { assert: { selector: '[data-part=title]', state: 'visible' } },
  { wait: 1100 },
]);
