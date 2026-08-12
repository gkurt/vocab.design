import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=timeline][data-phase=idle]', state: 'visible' } },
  { moveTo: '[data-part=target-delayed]' },
  // The pointer has landed and the label has not: this is the whole term, judged
  // early in the 600 ms window rather than at the edge of it.
  { assert: { selector: '[data-part=tip-delayed]', state: 'hidden' } },
  { assert: { selector: '[data-part=timeline][data-phase=waiting]', state: 'visible' } },
  // Load-bearing wait: the label exists only on the far side of its delay.
  { wait: 900 },
  { assert: { selector: '[data-part=tip-delayed]', state: 'visible' } },
  { assert: { selector: '[data-part=timeline][data-phase=shown]', state: 'visible' } },
  { moveTo: '[data-part=target-instant]' },
  // The twin answers the same hover with no wait at all.
  { assert: { selector: '[data-part=tip-instant]', state: 'visible' } },
  // Room for the delayed label's fade before claiming it is gone.
  { wait: 500 },
  { assert: { selector: '[data-part=tip-delayed]', state: 'hidden' } },
  { assert: { selector: '[data-part=timeline][data-phase=idle]', state: 'visible' } },
  { moveTo: '[data-part=caption]' },
  { wait: 500 },
  { assert: { selector: '[data-part=tip-instant]', state: 'hidden' } },
]);
