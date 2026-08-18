import { steps } from '#src/stage/choreography.ts';

// Idle is picked rather than waited out, and the reel restarts from its first frame every time it is
// picked, so the four dot claims below sit in the middle of a 1600 ms frame rather than near a turn.
export default steps([
  { wait: 900 },
  { assert: { selector: '[data-part=screen][data-mode=attracting]', state: 'visible' } },
  { assert: { selector: '[data-part=attract-layer]', state: 'visible' } },
  { assert: { selector: '[data-part=ready-layer]', state: 'hidden' } },
  { assert: { selector: '[data-part=dots]', state: 'visible' } },

  // The touch that ends the reel is not spent ending it: the kiosk lands on a screen a visitor
  // can actually use, with nothing carried over from the loop.
  { moveTo: '[data-part=screen]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=screen][data-mode=ready]', state: 'visible' } },
  { assert: { selector: '[data-part=ready-layer]', state: 'visible' } },
  { assert: { selector: '[data-part=attract-layer]', state: 'hidden' } },

  // Nobody there again. The reel starts over rather than resuming where it was interrupted.
  { moveTo: '[data-part=seg-idle]' },
  { click: true },
  { wait: 450 },
  { assert: { selector: '[data-part=screen][data-mode=attracting]', state: 'visible' } },
  { assert: { selector: '[data-part=dot-1][data-current]', state: 'visible' } },

  { wait: 1600 },
  { assert: { selector: '[data-part=dot-2][data-current]', state: 'visible' } },

  { wait: 1600 },
  { assert: { selector: '[data-part=dot-3][data-current]', state: 'visible' } },

  // Round again: an attract loop loops, because nobody is there to watch it end.
  { wait: 1600 },
  { assert: { selector: '[data-part=dot-1][data-current]', state: 'visible' } },
  { wait: 700 },
]);
