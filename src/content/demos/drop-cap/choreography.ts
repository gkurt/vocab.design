import { steps } from '#src/stage/choreography.ts';

// The letter is sunk into its own first lines from mount and answers no pointer, so
// the pass states the cap, the paragraph that wraps it, and the one that does not.
export default steps([
  { wait: 450 },
  { assert: { selector: '[data-part=cap]', state: 'visible' } },
  { assert: { selector: '[data-part=opening]', state: 'visible' } },
  { wait: 1400 },
  { assert: { selector: '[data-part=follow]', state: 'visible' } },
  { wait: 1600 },
]);
