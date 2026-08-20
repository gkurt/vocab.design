import { steps } from '#src/stage/choreography.ts';

// Scroll past the real button and the bar arrives; scroll back and it retires. The pass
// ends where the demo mounts, with the button on screen and the bar away (SPEC §8).
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=buy-inline]', state: 'visible' } },
  { assert: { selector: '[data-part=shell][data-buy=onscreen]', state: 'visible' } },
  { assert: { selector: '[data-part=bar]', state: 'hidden' } },
  { wait: 700 },

  { moveTo: '[data-part=viewport]' },
  { scroll: { y: 250 } },
  { wait: 700 },
  // The real button has left the viewport, which is the condition the bar answers.
  { assert: { selector: '[data-part=shell][data-buy=offscreen]', state: 'visible' } },
  { assert: { selector: '[data-part=bar]', state: 'visible' } },
  { assert: { selector: '[data-part=bar-buy]', state: 'visible' } },
  { wait: 1400 },

  { scroll: { y: -250 } },
  { wait: 700 },
  // Back at the top, the bar retires rather than competing with the button beside it.
  { assert: { selector: '[data-part=shell][data-buy=onscreen]', state: 'visible' } },
  { assert: { selector: '[data-part=bar]', state: 'hidden' } },
  { assert: { selector: '[data-part=buy-inline]', state: 'visible' } },
  { wait: 900 },
]);
