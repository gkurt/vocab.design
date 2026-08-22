import { steps } from '#src/stage/choreography.ts';

// Three drags, one per way this folder can be reached. Notes sits in the top-left cell, the
// folder holds the middle one and the empty spot is the far corner, so the straight line
// between the corners runs over the folder: crossing needs no waypoint, because it is simply
// where the route goes.
//
// The first drag takes that route without stopping: the ring fills part way and empties, the
// folder stays shut, and the corner is still there to drop on. The second drops straight onto
// the shut folder, which files the tile with nothing opening, because the dwell was never the
// price of filing. The third stops on the folder long enough to pay it, the folder springs
// open over the whole screen, and the same unbroken drag files the tile inside. A stopping
// waypoint dispatches nothing while it waits, which is exactly what a pointer holding still
// emits, and the demo's own clock counts the pause out (SPEC §8).
export default steps([
  { assert: { selector: '[data-part=folder-open]', state: 'hidden' } },
  { assert: { selector: '[data-part=folder-added]', state: 'hidden' } },
  { moveTo: '[data-part=app-notes]' },
  { wait: 400 },
  { drag: { to: '[data-part=free]' } },
  { wait: 600 },
  { assert: { selector: '[data-part=app-notes][data-at=free]', state: 'visible' } },
  { assert: { selector: '[data-part=folder-open]', state: 'hidden' } },
  { wait: 800 },
  // Straight down onto the shut folder and let go, without ever paying the dwell.
  { moveTo: '[data-part=app-music]' },
  { wait: 400 },
  { drag: { to: '[data-part=folder]' } },
  { wait: 500 },
  { assert: { selector: '[data-part=folder-added]', state: 'visible' } },
  { assert: { selector: '[data-part=app-music]', state: 'hidden' } },
  // Held past the dwell the drop did not pay for, because a countdown that outlived its own
  // gesture used to spring the folder open here with nothing in hand.
  { wait: 1100 },
  { assert: { selector: '[data-part=folder-open]', state: 'hidden' } },
  { wait: 700 },
  { moveTo: '[data-part=app-notes]' },
  { wait: 400 },
  { drag: { to: '[data-part=landing-0]', via: [{ at: '[data-part=folder]', dwell: 1150 }] } },
  { wait: 700 },
  // The tile leaving the grid is the proof this one went in: filed, it is no longer on the
  // home screen to pick up. The claim is made outside the panel, since a child of a panel at
  // opacity zero still reports its own opacity and would read as visible.
  { assert: { selector: '[data-part=app-notes]', state: 'hidden' } },
  { assert: { selector: '[data-part=folder-open]', state: 'hidden' } },
  { wait: 1200 },
]);
