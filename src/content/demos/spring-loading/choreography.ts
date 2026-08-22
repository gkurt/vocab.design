import { steps } from '#src/stage/choreography.ts';

// Two drags down the same route, differing only in whether the hand stops. Notes sits in the
// top-left cell, the folder holds the middle one and the empty spot is the far corner, so the
// straight line between the corners runs over the folder: crossing needs no waypoint, because
// it is simply where the route goes. The first drag takes that route without stopping, the
// ring fills part way and empties, the folder stays shut, and the corner is still there to
// drop on. The second stops on the folder long enough to pay the dwell, the folder springs
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
  { wait: 900 },
  { moveTo: '[data-part=app-notes]' },
  { wait: 400 },
  { drag: { to: '[data-part=landing-0]', via: [{ at: '[data-part=folder]', dwell: 1150 }] } },
  { wait: 700 },
  // The proof is the folder gaining an app, claimed on the spare preview dot on the folder
  // TILE rather than on anything inside the panel, since a child of a panel at opacity zero
  // still reports its own opacity and would read as visible. The tile leaving the grid is the
  // other half: filed, it is no longer on the home screen to pick up.
  { assert: { selector: '[data-part=folder-added]', state: 'visible' } },
  { assert: { selector: '[data-part=app-notes]', state: 'hidden' } },
  { assert: { selector: '[data-part=folder-open]', state: 'hidden' } },
  { wait: 1200 },
]);
