import { steps } from '#src/stage/choreography.ts';

// Setting answers no pointer, and all three lines are on stage from mount: the pass
// states the comparison, cramped beside corrected, and then holds it (SPEC §8).
export default steps([
  { wait: 450 },
  { assert: { selector: '[data-part=sample-mixed]', state: 'visible' } },
  { assert: { selector: '[data-part=sample-tight]', state: 'visible' } },
  { assert: { selector: '[data-part=sample-tracked][data-tracking="0.09em"]', state: 'visible' } },
  { wait: 1400 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 1600 },
]);
