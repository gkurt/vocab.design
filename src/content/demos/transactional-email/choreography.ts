import { steps } from '#src/stage/choreography.ts';

// Two absolute picks rather than a toggle (SPEC §8), and the pass ends on the state the
// subject's pose requires. The campaign state is asserted through what it displaced and
// what it now owes the reader, not through the promotion alone.
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=mail][data-mode="record"]', state: 'visible' } },
  { assert: { selector: '[data-part=detail]', state: 'visible' } },
  { assert: { selector: '[data-part=promo]', state: 'hidden' } },
  { assert: { selector: '[data-part=unsub-note]', state: 'hidden' } },
  { wait: 700 },
  { moveTo: '[data-part=mode-campaign]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=mail][data-mode="campaign"]', state: 'visible' } },
  { assert: { selector: '[data-part=promo]', state: 'visible' } },
  { assert: { selector: '[data-part=detail]', state: 'hidden' } },
  { assert: { selector: '[data-part=unsub-note]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=mode-record]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=mail][data-mode="record"]', state: 'visible' } },
  { assert: { selector: '[data-part=detail]', state: 'visible' } },
  { assert: { selector: '[data-part=promo]', state: 'hidden' } },
  { wait: 1000 },
]);
