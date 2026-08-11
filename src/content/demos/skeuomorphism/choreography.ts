import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=pad]', state: 'visible' } },
  { moveTo: '[data-part=tool-marker]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=tool-marker][data-selected]', state: 'visible' } },
  { moveTo: '[data-part=tool-pen]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=tool-pen][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=tool-marker][data-selected]', state: 'hidden' } },
  { wait: 900 },
]);
