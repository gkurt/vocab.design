import { steps } from '#src/stage/choreography.ts';

// The backdrop drifts on its own and answers no pointer, so the pass watches it: the
// wash and every blob are asserted where the cursor used to travel (SPEC §8).
export default steps([
  { wait: 800 },
  { assert: { selector: '[data-part=aurora]', state: 'visible' } },
  { assert: { selector: '[data-part=blob-1]', state: 'visible' } },
  { assert: { selector: '[data-part=blob-2]', state: 'visible' } },
  { wait: 1200 },
  { assert: { selector: '[data-part=blob-3]', state: 'visible' } },
  { assert: { selector: '[data-part=blob-4]', state: 'visible' } },
  { assert: { selector: '[data-part=card]', state: 'visible' } },
  { wait: 1400 },
]);
