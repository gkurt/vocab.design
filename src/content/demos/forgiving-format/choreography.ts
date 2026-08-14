import { steps } from '#src/stage/choreography.ts';

// The one shape both fields accept is typed first, so the rest of the pass is only about
// punctuation: every later spelling is the same number, and only one field keeps saying
// yes (SPEC §8).
export default steps([
  { assert: { selector: '[data-part=forgiving][data-state="empty"]', state: 'visible' } },
  { moveTo: '[data-part=forgiving-input]' },
  { click: true },
  { type: '07700900123' },
  { wait: 700 },
  { assert: { selector: '[data-part=forgiving][data-state="accepted"]', state: 'visible' } },
  { assert: { selector: '[data-part=strict][data-state="accepted"]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=chip-spaces]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=forgiving][data-state="accepted"]', state: 'visible' } },
  { assert: { selector: '[data-part=strict][data-state="rejected"]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=chip-plus]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=forgiving][data-state="accepted"]', state: 'visible' } },
  { assert: { selector: '[data-part=strict][data-state="rejected"]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=chip-dashes]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=forgiving][data-state="accepted"]', state: 'visible' } },
  { assert: { selector: '[data-part=strict][data-state="rejected"]', state: 'visible' } },
  { wait: 900 },
]);
