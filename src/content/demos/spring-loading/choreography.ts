import { steps } from '#src/stage/choreography.ts';

// Two drags down the same route, differing only in whether the hand stops. The first
// crosses Projects on its way to Archive: the ring fills most of the way and empties, the
// folder stays shut, and Archive is still there to drop on. The second stops on the header
// long enough to spring the folder, and the open folder swallows Archive, which is what
// would have happened on the first pass too if merely touching the folder were enough to
// open it. That is the case the dwell exists to protect, and the drop then lands inside
// without the drag ever being restarted. The dwell is performed rather than simulated: a
// waypoint that stops dispatches nothing while it waits, which is exactly what a pointer
// holding still emits, and the demo's own clock counts the pause out (SPEC §8).
export default steps([
  { assert: { selector: '[data-part=folder][data-sprung]', state: 'hidden' } },
  { assert: { selector: '[data-part=child-launch]', state: 'hidden' } },
  { moveTo: '[data-part=item]' },
  { wait: 400 },
  { drag: { to: '[data-part=archive]', via: ['[data-part=folder-row]'] } },
  { wait: 500 },
  { assert: { selector: '[data-part=item][data-dropped="archive"]', state: 'visible' } },
  { assert: { selector: '[data-part=folder][data-sprung]', state: 'hidden' } },
  { wait: 900 },
  { moveTo: '[data-part=item]' },
  { wait: 400 },
  { drag: { to: '[data-part=child-launch]', via: [{ at: '[data-part=folder-row]', dwell: 1500 }] } },
  { wait: 600 },
  // Only a sprung folder has anything to file into, so the drop landing on an item inside
  // it is the proof that the pause did the work.
  { assert: { selector: '[data-part=item][data-dropped="launch"]', state: 'visible' } },
  { assert: { selector: '[data-part=folder][data-sprung]', state: 'hidden' } },
  { assert: { selector: '[data-part=child-launch]', state: 'hidden' } },
  { wait: 1200 },
]);
