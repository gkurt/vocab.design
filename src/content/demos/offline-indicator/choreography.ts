import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=pill]', state: 'hidden' } },
  { moveTo: '[data-part=net-offline]' },
  { click: true },
  { assert: { selector: '[data-part=pill]', state: 'visible' } },
  { moveTo: '[data-part=composer]' },
  { click: true },
  { type: 'Running ten minutes late' },
  { moveTo: '[data-part=send]' },
  { click: true },
  { assert: { selector: '[data-part=queued][data-pending]', state: 'visible' } },
  { wait: 1000 },
  { moveTo: '[data-part=net-online]' },
  { click: true },
  { wait: 1100 },
  { assert: { selector: '[data-part=sent]', state: 'visible' } },
  { assert: { selector: '[data-part=queued]', state: 'hidden' } },
  { assert: { selector: '[data-part=pill]', state: 'hidden' } },
  { wait: 1200 },
]);
