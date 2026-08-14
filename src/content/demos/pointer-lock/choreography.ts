import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=viewport][data-locked]', state: 'hidden' } },
  { assert: { selector: '[data-part=pointer]', state: 'visible' } },
  // Unlocked, the same travel is a position: the drawn pointer moves and the world does not.
  { moveTo: '[data-part=dot-left]' },
  { wait: 500 },
  { moveTo: '[data-part=dot-right]' },
  { wait: 500 },
  { assert: { selector: '[data-part=viewport][data-turn=none]', state: 'visible' } },
  { moveTo: '[data-part=engage]' },
  { wait: 400 },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=viewport][data-locked]', state: 'visible' } },
  { assert: { selector: '[data-part=pointer]', state: 'hidden' } },
  { assert: { selector: '[data-part=reticle]', state: 'visible' } },
  // Locked, the same travel is a delta and the world turns with it.
  { moveTo: '[data-part=dot-left]' },
  { wait: 500 },
  { assert: { selector: '[data-part=viewport][data-turn=left]', state: 'visible' } },
  { moveTo: '[data-part=dot-right]' },
  { wait: 500 },
  { assert: { selector: '[data-part=viewport][data-turn=right]', state: 'visible' } },
  // Past the edge of the viewport, where an unlocked pointer would have run out of room.
  { moveTo: '[data-part=dot-out]' },
  { wait: 600 },
  { assert: { selector: '[data-part=viewport][data-outside=yes]', state: 'visible' } },
  { wait: 700 },
  // Escape is the one release a page cannot take away, so the script uses it.
  { press: 'Escape' },
  { wait: 600 },
  { assert: { selector: '[data-part=viewport][data-locked]', state: 'hidden' } },
  { assert: { selector: '[data-part=pointer]', state: 'visible' } },
  { wait: 900 },
]);
