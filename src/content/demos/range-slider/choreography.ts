import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=range][data-lower="200"][data-upper="800"]', state: 'visible' } },
  // Absolute, not relative: each drag ends over a labelled stop, so the handle
  // lands on the same value however the pass started (SPEC §8).
  { moveTo: '[data-part=thumb-min]' },
  { drag: { to: '[data-part=stop-400]' } },
  { wait: 500 },
  { assert: { selector: '[data-part=range][data-lower="400"]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=thumb-max]' },
  { drag: { to: '[data-part=stop-600]' } },
  { wait: 500 },
  { assert: { selector: '[data-part=range][data-upper="600"]', state: 'visible' } },
  { wait: 700 },
  // The other handle is a wall: the lower bound cannot pass the upper one.
  { moveTo: '[data-part=thumb-min]' },
  { drag: { to: '[data-part=stop-1000]' } },
  { wait: 500 },
  { assert: { selector: '[data-part=range][data-lower="600"][data-upper="600"]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=thumb-min]' },
  { drag: { to: '[data-part=stop-200]' } },
  { wait: 500 },
  { assert: { selector: '[data-part=range][data-lower="200"][data-upper="600"]', state: 'visible' } },
  { wait: 900 },
]);
