import { steps } from '#src/stage/choreography.ts';

// Two different thumbnails are opened, because where the growth starts is the whole term.
// The zoom runs 520ms, so the mid-flight claim lands inside it rather than on an edge, and
// every settled claim is made well after the view has stopped (SPEC §8).
//
// The mid-flight claim is only made on the way IN. Judging happens about 350ms after a click,
// and on the way out the view is fading to opacity 0 on a decelerating ease, so by then it is
// under the 0.05 floor isSeen uses: a visible claim on an exiting element fails however wide
// its window is. The shrink is claimed through the scrim lifting instead, which stays judgeable.
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=view]', state: 'hidden' } },
  { assert: { selector: '[data-part=thumb-b]', state: 'visible' } },

  { moveTo: '[data-part=thumb-b]' },
  { click: true },
  { assert: { selector: '[data-part=view][data-state=moving]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=view][data-from=b][data-state=settled]', state: 'visible' } },
  { assert: { selector: '[data-part=view-title]', state: 'visible' } },
  { wait: 600 },

  { moveTo: '[data-part=close]' },
  { click: true },
  { assert: { selector: '[data-part=scrim][data-open]', state: 'hidden' } },
  { wait: 900 },
  { assert: { selector: '[data-part=view]', state: 'hidden' } },
  { assert: { selector: '[data-part=thumb-b]', state: 'visible' } },

  { moveTo: '[data-part=thumb-f]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=view][data-from=f][data-state=settled]', state: 'visible' } },
  { assert: { selector: '[data-part=view-note]', state: 'visible' } },
  { wait: 700 },

  { moveTo: '[data-part=close]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=view]', state: 'hidden' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { wait: 600 },
]);
