import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=timeline][data-at=start]', state: 'visible' } },
  { assert: { selector: '[data-part=timeline][data-mode=idle]', state: 'visible' } },
  // A press on the strip first: the jump the word scrubbing is often spent on.
  { moveTo: '[data-part=cut-b]' },
  { wait: 400 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=timeline][data-mode=seek]', state: 'visible' } },
  { assert: { selector: '[data-part=timeline][data-at=mid]', state: 'visible' } },
  { wait: 900 },
  // Now the gesture itself. The destination is an absolute position on the timeline, so
  // a pass picked up part-way still lands at the same cut.
  { moveTo: '[data-part=playhead]' },
  { wait: 400 },
  { drag: { to: '[data-part=cut-c]' } },
  { wait: 600 },
  { assert: { selector: '[data-part=timeline][data-mode=scrub]', state: 'visible' } },
  { assert: { selector: '[data-part=timeline][data-at=end]', state: 'visible' } },
  { wait: 1100 },
  { moveTo: '[data-part=playhead]' },
  { wait: 400 },
  { drag: { to: '[data-part=cut-a]' } },
  { wait: 600 },
  { assert: { selector: '[data-part=timeline][data-at=start]', state: 'visible' } },
  { wait: 1000 },
]);
