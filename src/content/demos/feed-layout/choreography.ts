import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 400 },
  // Mount is the chronological rule, parked at the head of the column.
  { assert: { selector: '[data-part=feed][data-order=chronological]', state: 'visible' } },
  { assert: { selector: '[data-part=feed][data-at=top]', state: 'visible' } },
  { assert: { selector: '[data-part=post-a][data-first]', state: 'visible' } },
  { wait: 900 },
  // The column is the scroller: the peers below the fold are reached by moving it.
  { moveTo: '[data-part=feed]' },
  { scroll: { y: 90 } },
  { wait: 700 },
  { assert: { selector: '[data-part=feed][data-at=middle]', state: 'visible' } },
  { wait: 800 },
  // New posts returns the reader to the head rather than inserting under them.
  { moveTo: '[data-part=new-posts]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=feed][data-at=top]', state: 'visible' } },
  { wait: 800 },
  // Same four cards, same sizes: the ordering rule is the only ranking a feed has.
  { moveTo: '[data-part=seg-ranked]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=seg-ranked][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=feed][data-order=ranked]', state: 'visible' } },
  { assert: { selector: '[data-part=post-c][data-first]', state: 'visible' } },
  { assert: { selector: '[data-part=post-a][data-first]', state: 'hidden' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-chrono]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=feed][data-order=chronological]', state: 'visible' } },
  { assert: { selector: '[data-part=post-a][data-first]', state: 'visible' } },
  { wait: 900 },
]);
