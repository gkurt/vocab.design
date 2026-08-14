import { steps } from '#src/stage/choreography.ts';

// The query is mistyped a character at a time, which is the gesture this pattern
// answers. Both conventions are then reached by their own button, never by a toggle:
// one runs the reader's words, the other runs the correction (SPEC §8).
export default steps([
  { assert: { selector: '[data-part=strip]', state: 'hidden' } },
  { moveTo: '[data-part=query]' },
  { wait: 300 },
  { type: 'recieve' },
  { wait: 500 },
  { assert: { selector: '[data-part=strip][data-mode=corrected]', state: 'visible' } },
  { assert: { selector: '[data-part=hit-payout]', state: 'visible' } },
  { assert: { selector: '[data-part=hit-alerts]', state: 'visible' } },
  { assert: { selector: '[data-part=hit-invoice]', state: 'hidden' } },
  { assert: { selector: '[data-part=literal]', state: 'visible' } },
  { wait: 1200 },
  // The reader takes their own spelling back, which is the half of the pattern that
  // gets dropped: the corrected query must be undoable in one click.
  { moveTo: '[data-part=literal]' },
  { wait: 300 },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=strip][data-mode=literal]', state: 'visible' } },
  { assert: { selector: '[data-part=empty]', state: 'visible' } },
  { assert: { selector: '[data-part=hit-payout]', state: 'hidden' } },
  { assert: { selector: '[data-part=suggest]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=suggest]' },
  { wait: 300 },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=strip][data-mode=corrected]', state: 'visible' } },
  { assert: { selector: '[data-part=hit-refund]', state: 'visible' } },
  { assert: { selector: '[data-part=empty]', state: 'hidden' } },
  { wait: 1200 },
]);
