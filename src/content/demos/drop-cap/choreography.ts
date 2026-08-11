import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=cap]', state: 'visible' } },
  { assert: { selector: '[data-part=opening]', state: 'visible' } },
  { wait: 1000 },
  // The cursor reads the way an eye does: the letter first, then the lines that
  // wrap around it, then the paragraph that gets no mark at all.
  { moveTo: '[data-part=cap]' },
  { wait: 1100 },
  { moveTo: '[data-part=opening]' },
  { wait: 1000 },
  { moveTo: '[data-part=follow]' },
  { wait: 1000 },
  { assert: { selector: '[data-part=cap]', state: 'visible' } },
  { wait: 700 },
]);
