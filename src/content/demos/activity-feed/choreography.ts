import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=feed][data-count="6"]', state: 'visible' } },
  { assert: { selector: '[data-part=new-1]', state: 'hidden' } },
  // The first arrival, at the top, where it cannot push the row being read.
  { wait: 2700 },
  { assert: { selector: '[data-part=new-1]', state: 'visible' } },
  { assert: { selector: '[data-part=new-2]', state: 'hidden' } },
  { wait: 2500 },
  { assert: { selector: '[data-part=new-2]', state: 'visible' } },
  { assert: { selector: '[data-part=feed][data-count="8"]', state: 'visible' } },
  { moveTo: '[data-part=feed]' },
  { scroll: { y: 140 } },
  { wait: 800 },
  // The history is still there underneath: a feed keeps what it has already said.
  { assert: { selector: '[data-part=row-6]', state: 'visible' } },
  { wait: 1000 },
]);
