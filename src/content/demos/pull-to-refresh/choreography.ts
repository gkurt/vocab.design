import { steps } from '#src/stage/choreography.ts';

// The gesture reaches a distance, twice: once past the arming threshold, once short of
// it. The second beat is the cancel, which is the half of the pattern that is easy to
// leave out (SPEC §8).
export default steps([
  { assert: { selector: '[data-part=indicator]', state: 'hidden' } },
  { assert: { selector: '[data-part=row-new-1]', state: 'hidden' } },
  { moveTo: '[data-part=row-2]' },
  { wait: 300 },
  { drag: { to: '[data-part=row-4]' } },
  { wait: 250 },
  { assert: { selector: '[data-part=indicator][data-state="refreshing"]', state: 'visible' } },
  { wait: 1200 },
  { assert: { selector: '[data-part=row-new-1]', state: 'visible' } },
  { assert: { selector: '[data-part=indicator]', state: 'hidden' } },
  { wait: 700 },
  // Short of the arming distance: the space opens, springs back, and nothing is fetched.
  { moveTo: '[data-part=row-3]' },
  { wait: 300 },
  { drag: { to: '[data-part=row-4]' } },
  { wait: 700 },
  { assert: { selector: '[data-part=indicator]', state: 'hidden' } },
  { assert: { selector: '[data-part=row-new-2]', state: 'hidden' } },
  { wait: 900 },
]);
