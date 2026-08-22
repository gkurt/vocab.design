import { steps } from '#src/stage/choreography.ts';

// The first drag crosses Projects on its way to Archive, which is the common case and the
// one the dwell exists to survive: the ring fills part way and empties. Only a pointer
// that stays put opens the folder, and only then can a drop land inside it. The dwell is
// performed rather than simulated: a `moveTo` puts the pointer on the header and a `wait`
// leaves it there, which is all a dwell has ever been (SPEC §8).
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
  // The pointer rests on the header and stays there: the ring fills to the end and the
  // folder springs.
  { moveTo: '[data-part=folder-row]' },
  { wait: 1000 },
  { assert: { selector: '[data-part=folder][data-sprung]', state: 'visible' } },
  { assert: { selector: '[data-part=child-launch]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=item]' },
  { wait: 400 },
  { drag: { to: '[data-part=child-launch]' } },
  { wait: 600 },
  { assert: { selector: '[data-part=item][data-dropped="launch"]', state: 'visible' } },
  { assert: { selector: '[data-part=child-launch]', state: 'hidden' } },
  { wait: 1200 },
]);
