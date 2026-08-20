import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The frame fades in from mount, so the first reading of the region waits for it.
  { wait: 700 },
  { assert: { selector: '[data-part=scroller][data-at=start]', state: 'visible' } },
  { assert: { selector: '[data-part=frozen][data-held=yes]', state: 'visible' } },
  { assert: { selector: '[data-part=name-3]', state: 'visible' } },
  { wait: 500 },

  // Sideways, far enough that the early weeks are gone. The berth column has not moved,
  // which is what `data-held` is measured to prove.
  { moveTo: '[data-part=scroller]' },
  { scroll: { x: 200 } },
  { wait: 700 },
  { assert: { selector: '[data-part=scroller][data-at=mid]', state: 'visible' } },
  { assert: { selector: '[data-part=frozen][data-held=yes]', state: 'visible' } },
  { assert: { selector: '[data-part=name-3]', state: 'visible' } },
  { wait: 600 },

  // All the way to the last week, which has now arrived from off the right edge.
  { scroll: { x: 420 } },
  { wait: 800 },
  { assert: { selector: '[data-part=scroller][data-at=end]', state: 'visible' } },
  { assert: { selector: '[data-part=frozen][data-held=yes]', state: 'visible' } },
  { assert: { selector: '[data-part=head-w10]', state: 'visible' } },
  { assert: { selector: '[data-part=name-6]', state: 'visible' } },
  { wait: 700 },

  // And back, so the pass ends where it began.
  { scroll: { x: -640 } },
  { wait: 800 },
  { assert: { selector: '[data-part=scroller][data-at=start]', state: 'visible' } },
  { assert: { selector: '[data-part=frozen][data-held=yes]', state: 'visible' } },
  { wait: 600 },
]);
