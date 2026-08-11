import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=meter][data-zone=ok]', state: 'visible' } },
  { moveTo: '[data-part=import-video]' },
  { click: true },
  { wait: 700 },
  // The reading crossed the high mark, which is the one thing a meter says that a
  // progress bar cannot: this is a level, and it is getting uncomfortable.
  { assert: { selector: '[data-part=meter][data-zone=warn]', state: 'visible' } },
  { assert: { selector: '[data-part=note]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=empty-trash]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=meter][data-zone=ok]', state: 'visible' } },
  { wait: 900 },
]);
