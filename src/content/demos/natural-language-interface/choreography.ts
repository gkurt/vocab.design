import { steps } from '#src/stage/choreography.ts';

// The sentence arrives a character at a time, so the parse is demonstrated against the
// gesture a person actually makes: each phrase becomes a constraint as it lands.
export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=chips-empty]', state: 'visible' } },
  { assert: { selector: '[data-part=rows]', state: 'hidden' } },
  { moveTo: '[data-part=query]' },
  { wait: 400 },
  { type: 'unpaid invoices from Acme over 500 last quarter' },
  { wait: 600 },
  { assert: { selector: '[data-part=chip-status]', state: 'visible' } },
  { assert: { selector: '[data-part=chip-customer]', state: 'visible' } },
  { assert: { selector: '[data-part=chip-amount]', state: 'visible' } },
  { assert: { selector: '[data-part=chip-period]', state: 'visible' } },
  { assert: { selector: '[data-part=chips-empty]', state: 'hidden' } },
  { wait: 700 },
  { moveTo: '[data-part=run]' },
  { wait: 400 },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=result][data-state=ran]', state: 'visible' } },
  { assert: { selector: '[data-part=rows]', state: 'visible' } },
  { wait: 1600 },
]);
