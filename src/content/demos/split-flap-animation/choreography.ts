import { steps } from '#src/stage/choreography.ts';

// Change names a run rather than toggling one: every press flips the board to the next
// destination, so a resumed pass still lands on a settled board (SPEC §8).
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=board][data-state=settled]', state: 'visible' } },
  { assert: { selector: '[data-part=cell-2]', state: 'visible' } },
  { moveTo: '[data-part=change]' },
  { click: true },
  // The longest run is about two and a half seconds, so the post-click beat is well inside it.
  { assert: { selector: '[data-part=board][data-state=flipping]', state: 'visible' } },
  { wait: 3200 },
  { assert: { selector: '[data-part=board][data-state=settled]', state: 'visible' } },
  { assert: { selector: '[data-part=cell-2]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { wait: 800 },
]);
