import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=msg-ask]', state: 'visible' } },
  { assert: { selector: '[data-part=indicator]', state: 'hidden' } },
  { assert: { selector: '[data-part=reply]', state: 'hidden' } },
  { wait: 700 },
  { moveTo: '[data-part=ask]' },
  { click: true },
  // Load-bearing: the indicator exists only inside this beat, which is what tells a
  // summon to wait for it rather than skip past (SPEC §6).
  { wait: 450 },
  { assert: { selector: '[data-part=indicator]', state: 'visible' } },
  { assert: { selector: '[data-part=reply]', state: 'hidden' } },
  // The promise is kept 1700 ms after the press; the claim is made well clear of it.
  { wait: 1700 },
  { assert: { selector: '[data-part=reply]', state: 'visible' } },
  { assert: { selector: '[data-part=indicator]', state: 'hidden' } },
  { wait: 1100 },
]);
