import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 320 },
  { assert: { selector: '[data-part=act-star]', state: 'visible' } },
  { assert: { selector: '[data-part=act-share]', state: 'visible' } },
  { assert: { selector: '[data-part=menu]', state: 'hidden' } },
  { moveTo: '[data-part=more]' },
  { click: true },
  { wait: 340 },
  { assert: { selector: '[data-part=menu]', state: 'visible' } },
  { assert: { selector: '[data-part=item-archive]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=item-archive]' },
  { wait: 300 },
  { click: true },
  { wait: 440 },
  { assert: { selector: '[data-part=menu]', state: 'hidden' } },
  { assert: { selector: '[data-part=readout][data-value=archive]', state: 'visible' } },
  { wait: 900 },
]);
