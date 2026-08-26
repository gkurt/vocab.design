import { steps } from '#src/stage/choreography.ts';

// The flow only moves forward and each control spends itself (SPEC §8). The beat before
// the confirmation lands is load-bearing, so an assert follows it rather than a bare
// wait, which is also what lets identify summon the control. The ledger carries the
// cumulative claim, so the counts are asserted there rather than off the last thing
// pressed.
export default steps([
  { assert: { selector: '[data-part=ledger][data-confirmed="412"][data-awaiting="0"]', state: 'visible' } },
  { assert: { selector: '[data-part=mail-empty]', state: 'visible' } },
  { assert: { selector: '[data-part=confirm]', state: 'hidden' } },
  { wait: 600 },
  { moveTo: '[data-part=subscribe]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=pending-note]', state: 'visible' } },
  { assert: { selector: '[data-part=ledger][data-confirmed="412"][data-awaiting="1"]', state: 'visible' } },
  { wait: 1100 },
  // The proof has to be acted on from the address itself, so the control arrives there.
  { assert: { selector: '[data-part=mail]', state: 'visible' } },
  { assert: { selector: '[data-part=confirm]', state: 'visible' } },
  { wait: 600 },
  { moveTo: '[data-part=confirm]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=confirm][aria-disabled="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=ledger][data-confirmed="413"][data-awaiting="0"]', state: 'visible' } },
  { wait: 1400 },
]);
