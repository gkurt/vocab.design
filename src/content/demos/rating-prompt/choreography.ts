import { steps } from '#src/stage/choreography.ts';

// Each answer reaches its own state rather than flipping the other's (SPEC §8), so a
// pass resumed anywhere still shows one branch of the gate rather than undoing one.
export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=prompt][data-answer="none"]', state: 'visible' } },
  { assert: { selector: '[data-part=route-store]', state: 'hidden' } },
  { assert: { selector: '[data-part=route-private]', state: 'hidden' } },
  { moveTo: '[data-part=answer-happy]' },
  { wait: 350 },
  { click: true },
  { wait: 550 },
  { assert: { selector: '[data-part=prompt][data-answer="happy"]', state: 'visible' } },
  { assert: { selector: '[data-part=route-store]', state: 'visible' } },
  { assert: { selector: '[data-part=route-private]', state: 'hidden' } },
  { wait: 1400 },
  { moveTo: '[data-part=answer-meh]' },
  { wait: 350 },
  { click: true },
  { wait: 550 },
  // The same question, the other answer, and a destination the public average never sees.
  { assert: { selector: '[data-part=prompt][data-answer="meh"]', state: 'visible' } },
  { assert: { selector: '[data-part=route-private]', state: 'visible' } },
  { assert: { selector: '[data-part=route-store]', state: 'hidden' } },
  { wait: 1500 },
]);
