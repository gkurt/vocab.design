import { steps } from '#src/stage/choreography.ts';

// The first drag crosses Projects on its way to Archive, which is the common case and the
// one the dwell exists to survive: the ring fills part way and empties. Only the held
// hover opens the folder, and only then can a drop land inside it.
export default steps([
  { assert: { selector: '[data-part=folder][data-sprung]', state: 'hidden' } },
  { assert: { selector: '[data-part=child-launch]', state: 'hidden' } },
  { moveTo: '[data-part=item]' },
  { wait: 400 },
  { drag: { to: '[data-part=archive]' } },
  { wait: 500 },
  { assert: { selector: '[data-part=item][data-dropped="archive"]', state: 'visible' } },
  { assert: { selector: '[data-part=folder][data-sprung]', state: 'hidden' } },
  { wait: 900 },
  // No step holds a drag still (SPEC §8), so the dwell is reached through the labelled
  // control, which runs the same countdown a hand does.
  { moveTo: '[data-part=sim]' },
  { wait: 300 },
  { click: true },
  { wait: 1000 },
  { assert: { selector: '[data-part=folder][data-sprung]', state: 'visible' } },
  { assert: { selector: '[data-part=child-launch]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=item]' },
  { wait: 300 },
  { drag: { to: '[data-part=child-launch]' } },
  { wait: 600 },
  { assert: { selector: '[data-part=item][data-dropped="launch"]', state: 'visible' } },
  { assert: { selector: '[data-part=child-launch]', state: 'hidden' } },
  { wait: 1200 },
]);
