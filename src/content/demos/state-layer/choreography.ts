import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=target][data-state=rest]', state: 'visible' } },
  { moveTo: '[data-part=target]' },
  // The container colour has not changed; the sheet over it went from 0 to 8%.
  { assert: { selector: '[data-part=target][data-state=hover]', state: 'visible' } },
  { wait: 800 },
  { click: true },
  { assert: { selector: '[data-part=target][data-state=pressed]', state: 'visible' } },
  { wait: 1300 },
  { assert: { selector: '[data-part=target][data-state=hover]', state: 'visible' } },
  { moveTo: '[data-part=exploded]' },
  { assert: { selector: '[data-part=target][data-state=rest]', state: 'visible' } },
  { wait: 900 },
]);
