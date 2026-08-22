import { steps } from '#src/stage/choreography.ts';

// Two drags down the same route, differing only in whether the finger stops on the
// folder. Both open with the same long press, performed as a stop at the drag's own
// origin: the travel there is zero length, so the contact simply holds still on the
// tile while the demo's clock counts the pick-up out, and no ring is drawn for it.
//
// The first drag then CROSSES the folder on its way to the free spot. The ring fills
// part way and empties, the folder stays shut, and the free spot is still reachable,
// which is what would have been lost if merely touching the folder opened it. The
// second stops on the folder long enough to spring it open over almost the whole
// screen, and the same drag, never restarted, drops the tile inside. The dwell is
// performed rather than simulated: a waypoint that stops dispatches nothing while it
// waits, which is exactly what a finger holding still emits (SPEC §8).
export default steps([
  { assert: { selector: '[data-part=folder-open]', state: 'hidden' } },
  { assert: { selector: '[data-part=folder-added]', state: 'hidden' } },
  { moveTo: '[data-part=app-notes]' },
  { wait: 400 },
  { drag: { to: '[data-part=free]', via: [{ at: '[data-part=app-notes]', dwell: 700 }, '[data-part=folder]'] } },
  { wait: 600 },
  { assert: { selector: '[data-part=app-notes][data-at=free]', state: 'visible' } },
  { assert: { selector: '[data-part=folder-open]', state: 'hidden' } },
  { wait: 900 },
  { moveTo: '[data-part=app-notes]' },
  { wait: 400 },
  {
    drag: {
      to: '[data-part=slot]',
      via: [
        { at: '[data-part=app-notes]', dwell: 700 },
        { at: '[data-part=folder]', dwell: 1150 },
      ],
    },
  },
  { wait: 700 },
  // Only a sprung folder has an inside, so a tile that is now in the folder's preview
  // and gone from the grid is the proof that the pause did the work.
  { assert: { selector: '[data-part=folder-added]', state: 'visible' } },
  { assert: { selector: '[data-part=app-notes]', state: 'hidden' } },
  { assert: { selector: '[data-part=folder-open]', state: 'hidden' } },
  { wait: 1200 },
]);
