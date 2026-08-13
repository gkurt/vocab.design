import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=panel]', state: 'visible' } },
  { assert: { selector: '[data-part=field]', state: 'visible' } },
  { assert: { selector: '[data-part=emboss]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=field]' },
  { wait: 800 },
  { moveTo: '[data-part=button]' },
  { wait: 500 },
  { click: true },
  { wait: 250 },
  // The down state is the up state with its border pair exchanged.
  { assert: { selector: '[data-part=button][data-pressed]', state: 'visible' } },
  { wait: 1000 },
  { assert: { selector: '[data-part=button][data-pressed]', state: 'hidden' } },
  { wait: 500 },
]);
