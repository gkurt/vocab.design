import { steps } from '#src/stage/choreography.ts';

// The same panel is shown and hidden twice, once on each setting, because the difference between
// the two arrivals is the whole term. The fold runs 620 ms, so the mid-flight claim lands well
// inside it and every settled claim is made a full second after the move stopped (SPEC §8).
//
// The mid-flight claim is only made on the way IN. Going away, the panel is creasing back to a box
// of no height, so a visible claim on it would fail however wide the window; the fold home is
// claimed through the scene losing its open flag, which stays judgeable (SPEC §8).
//
// The script leaves the panel unfolded on the dimensional setting, so a summon that runs to the end
// rests on the state the term actually names.
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=scene][data-mode=dimensional]', state: 'visible' } },
  { assert: { selector: '[data-part=panel]', state: 'hidden' } },
  { assert: { selector: '[data-part=show]', state: 'visible' } },

  { moveTo: '[data-part=show]' },
  { click: true },
  // Judged while the flap is still coming round: the travel is the term.
  { assert: { selector: '[data-part=panel][data-state=moving]', state: 'visible' } },
  { wait: 1000 },
  { assert: { selector: '[data-part=panel][data-mode=dimensional][data-state=settled]', state: 'visible' } },
  { assert: { selector: '[data-part=row-fee]', state: 'visible' } },
  { wait: 500 },

  { moveTo: '[data-part=hide]' },
  { click: true },
  { assert: { selector: '[data-part=scene][data-open]', state: 'hidden' } },
  { wait: 1000 },
  { assert: { selector: '[data-part=panel]', state: 'hidden' } },
  { assert: { selector: '[data-part=where]', state: 'visible' } },

  // The counter-example: the same panel, arriving with no depth at all.
  { moveTo: '[data-part=seg-flat]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=scene][data-mode=flat]', state: 'visible' } },

  { moveTo: '[data-part=show]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=panel][data-mode=flat][data-state=settled]', state: 'visible' } },
  { assert: { selector: '[data-part=row-fee]', state: 'visible' } },
  { wait: 500 },

  { moveTo: '[data-part=hide]' },
  { click: true },
  { assert: { selector: '[data-part=scene][data-open]', state: 'hidden' } },
  { wait: 900 },
  { assert: { selector: '[data-part=panel]', state: 'hidden' } },

  { moveTo: '[data-part=seg-dimensional]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=scene][data-mode=dimensional]', state: 'visible' } },

  { moveTo: '[data-part=show]' },
  { click: true },
  { wait: 1000 },
  { assert: { selector: '[data-part=panel][data-mode=dimensional][data-state=settled]', state: 'visible' } },
  { wait: 600 },
]);
