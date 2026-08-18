import { steps } from '#src/stage/choreography.ts';

// Both lanes start from frame one at mount and again on every pace pick, so the yo-yo's return leg
// sits at a known moment: with the slow pace a leg is 1500 ms, and the claims below are aimed at the
// middle of a leg rather than anywhere near a turn.
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=scene][data-pace=slow]', state: 'visible' } },
  { assert: { selector: '[data-part=yoyo]', state: 'visible' } },
  { assert: { selector: '[data-part=restart]', state: 'visible' } },
  { assert: { selector: '[data-part=note]', state: 'visible' } },

  // Each segment names a pace, so the pick lands on that pace rather than stepping to the next one.
  { moveTo: '[data-part=seg-brisk]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=scene][data-pace=brisk]', state: 'visible' } },
  { assert: { selector: '[data-part=yoyo][data-pace=brisk]', state: 'visible' } },

  { moveTo: '[data-part=seg-slow]' },
  { click: true },
  { assert: { selector: '[data-part=scene][data-pace=slow]', state: 'visible' } },

  // Mid return leg: the yo-yo is walking back through the frames it came through, while the plain
  // loop is already crossing again from a jump it made with nothing drawn in between.
  { wait: 1970 },
  { assert: { selector: '[data-part=yoyo][data-heading=back]', state: 'visible' } },
  { assert: { selector: '[data-part=restart][data-heading=out]', state: 'visible' } },

  // Mid outward leg, one turn later.
  { wait: 1500 },
  { assert: { selector: '[data-part=yoyo][data-heading=out]', state: 'visible' } },
  { wait: 700 },
]);
