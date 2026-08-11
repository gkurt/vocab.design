import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=scrubber][data-at=start]', state: 'visible' } },
  // The band that separates a scrubber from a slider: downloaded, not yet played.
  { assert: { selector: '[data-part=buffered]', state: 'visible' } },
  { assert: { selector: '[data-part=preview]', state: 'hidden' } },
  { moveTo: '[data-part=playhead]' },
  { wait: 400 },
  // An absolute destination: the playhead lands on the second chapter mark whatever
  // position the pass found it in.
  { drag: { to: '[data-part=chapter-2]' } },
  { wait: 500 },
  { assert: { selector: '[data-part=scrubber][data-at=end]', state: 'visible' } },
  // Released, so the aiming bubble has gone with the drag.
  { assert: { selector: '[data-part=preview]', state: 'hidden' } },
  { wait: 800 },
  { moveTo: '[data-part=playhead]' },
  { press: 'Home' },
  { wait: 500 },
  { assert: { selector: '[data-part=scrubber][data-at=start]', state: 'visible' } },
  { wait: 800 },
]);
