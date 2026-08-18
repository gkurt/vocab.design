import { steps } from '#src/stage/choreography.ts';

// One scroller, three behaviours. The claim the pass has to prove is the return: the bar
// comes back on a small upward scroll while the reader is still part way down the list,
// which is what separates it from the plain hiding bar the middle section runs. The bar
// itself goes invisible when it leaves, so the away claims ride the scroller (SPEC §8).
// The pass returns to the state the specimen mounts in.
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=header][data-at=rest]', state: 'visible' } },
  { assert: { selector: '[data-part=page][data-deep]', state: 'hidden' } },

  { moveTo: '[data-part=page]' },
  { scroll: { y: 260 } },
  { wait: 800 },
  { assert: { selector: '[data-part=page][data-bar=away]', state: 'visible' } },
  { assert: { selector: '[data-part=header]', state: 'hidden' } },
  { assert: { selector: '[data-part=page][data-deep]', state: 'visible' } },

  { scroll: { y: -50 } },
  { wait: 800 },
  // Back at once, and still part way down: the bar returned rather than the reader rewinding.
  { assert: { selector: '[data-part=header][data-at=rest]', state: 'visible' } },
  { assert: { selector: '[data-part=page][data-deep]', state: 'visible' } },
  { wait: 900 },

  { moveTo: '[data-part=mode-hide]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=page][data-bar=away]', state: 'visible' } },
  { moveTo: '[data-part=page]' },
  { scroll: { y: -50 } },
  { wait: 800 },
  // The same upward gesture, and this bar is still gone: it waits for the top of the list.
  { assert: { selector: '[data-part=page][data-bar=away]', state: 'visible' } },
  { assert: { selector: '[data-part=page][data-deep]', state: 'visible' } },
  { scroll: { y: -400 } },
  { wait: 900 },
  { assert: { selector: '[data-part=header][data-at=rest]', state: 'visible' } },
  { assert: { selector: '[data-part=page][data-deep]', state: 'hidden' } },

  { moveTo: '[data-part=mode-sticky]' },
  { click: true },
  { wait: 600 },
  { moveTo: '[data-part=page]' },
  { scroll: { y: 260 } },
  { wait: 800 },
  { assert: { selector: '[data-part=header][data-at=rest]', state: 'visible' } },
  { assert: { selector: '[data-part=page][data-deep]', state: 'visible' } },
  { scroll: { y: -400 } },
  { wait: 800 },

  { moveTo: '[data-part=mode-quick]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=header][data-behaviour=quick-return]', state: 'visible' } },
  { assert: { selector: '[data-part=header][data-at=rest]', state: 'visible' } },
  { wait: 700 },
]);
