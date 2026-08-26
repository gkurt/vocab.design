import { steps } from '#src/stage/choreography.ts';

// A still script (SPEC §8). The whole claim is visible at rest: the same article served and
// printed, so the asserts name what survived the crossing and what was dropped on the way.
// The stage cannot print and there is no second state to reach, so nothing is pointed at.
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=sheet]', state: 'visible' } },
  { assert: { selector: '[data-part=target]', state: 'visible' } },
  { assert: { selector: '[data-part=folio]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=nav]', state: 'visible' } },
  { assert: { selector: '[data-part=share]', state: 'visible' } },
  { assert: { selector: '[data-part=related]', state: 'visible' } },
  { assert: { selector: '[data-part=banner]', state: 'visible' } },
  { wait: 1000 },
]);
