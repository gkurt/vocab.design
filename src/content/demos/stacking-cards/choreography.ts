import { steps } from '#src/stage/choreography.ts';

// The scroller is the target of a scroll step, so the cursor is put on it before the deck is dealt.
// Each scroll lands well inside the band where a given number of cards is down (the second card
// sticks at 146, the third at 288, the fourth at 430), never at the edge of one, and the last scroll
// deliberately overshoots so the browser's own clamp puts the deck back at the top.
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=scene][data-stacked="0"]', state: 'visible' } },
  { assert: { selector: '[data-part=card-1][data-state=loose]', state: 'visible' } },
  { assert: { selector: '[data-part=count]', state: 'visible' } },

  { moveTo: '[data-part=port]' },
  { wait: 400 },
  { scroll: { y: 200 } },
  { wait: 700 },
  { assert: { selector: '[data-part=scene][data-stacked="2"]', state: 'visible' } },
  // The first card did not leave: it stopped at its offset and the second one rode over it.
  { assert: { selector: '[data-part=card-1][data-state=covered]', state: 'visible' } },
  { assert: { selector: '[data-part=pip-2][data-down=yes]', state: 'visible' } },

  { scroll: { y: 160 } },
  { wait: 700 },
  { assert: { selector: '[data-part=scene][data-stacked="3"]', state: 'visible' } },

  { scroll: { y: 200 } },
  { wait: 700 },
  { assert: { selector: '[data-part=scene][data-stacked="4"]', state: 'visible' } },
  { assert: { selector: '[data-part=pip-4][data-down=yes]', state: 'visible' } },
  { assert: { selector: '[data-part=card-1]', state: 'visible' } },
  { wait: 600 },

  { scroll: { y: -800 } },
  { wait: 800 },
  { assert: { selector: '[data-part=scene][data-stacked="0"]', state: 'visible' } },
  { assert: { selector: '[data-part=card-1][data-state=loose]', state: 'visible' } },
  { wait: 600 },
]);
