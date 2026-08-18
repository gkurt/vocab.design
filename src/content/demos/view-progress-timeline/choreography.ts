import { steps } from '#src/stage/choreography.ts';

// The card mounts parked halfway through its own journey, wholly inside the scrollport. The first
// three picks never touch the scroller: they prove that one scroll position reads differently on
// every range, which is the whole term. Only then does the scroll move, and the scroll amounts
// deliberately overshoot both ends so the browser's own clamp decides where the card stops.
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=scene][data-range=cover]', state: 'visible' } },
  { assert: { selector: '[data-part=card][data-at=running]', state: 'visible' } },
  { assert: { selector: '[data-part=band]', state: 'visible' } },
  { assert: { selector: '[data-part=marker]', state: 'visible' } },

  // Same position: entry finished the moment the card was wholly inside.
  { moveTo: '[data-part=seg-entry]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=card][data-range=entry][data-at=after]', state: 'visible' } },

  // Same position again: exit has not started, however far the scroller has come.
  { moveTo: '[data-part=seg-exit]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=card][data-range=exit][data-at=before]', state: 'visible' } },
  { assert: { selector: '[data-part=card][data-progress="0"]', state: 'visible' } },

  { moveTo: '[data-part=seg-contain]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=card][data-range=contain][data-at=running]', state: 'visible' } },

  // Now the card moves. At the top of its journey it is not yet wholly inside, so contain is at nought.
  { moveTo: '[data-part=port]' },
  { scroll: { y: -260 } },
  { wait: 700 },
  { assert: { selector: '[data-part=card][data-range=contain][data-at=before]', state: 'visible' } },

  // At the far end it has started leaving, so contain is spent.
  { scroll: { y: 400 } },
  { wait: 800 },
  { assert: { selector: '[data-part=card][data-range=contain][data-at=after]', state: 'visible' } },

  { moveTo: '[data-part=seg-cover]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=card][data-range=cover][data-at=running]', state: 'visible' } },

  // Back to the middle, so every pass ends where it began.
  { moveTo: '[data-part=port]' },
  { scroll: { y: -86 } },
  { wait: 700 },
  { assert: { selector: '[data-part=card][data-range=cover][data-at=running]', state: 'visible' } },
  { wait: 600 },
]);
