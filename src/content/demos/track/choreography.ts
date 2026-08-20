import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the resting claims wait for the card to land.
  { wait: 700 },
  { assert: { selector: '[data-part=track][data-band=mid]', state: 'visible' } },
  { assert: { selector: '[data-part=thumb]', state: 'visible' } },
  { assert: { selector: '[data-part=bar][data-at=start]', state: 'visible' } },
  { assert: { selector: '[data-part=bar-thumb]', state: 'visible' } },
  { assert: { selector: '[data-part=prog]', state: 'visible' } },
  { wait: 500 },

  // The handle travels the groove and the split follows it. The groove itself does not move.
  { moveTo: '[data-part=thumb]' },
  { drag: { to: '[data-part=aim-high]' } },
  { wait: 500 },
  { assert: { selector: '[data-part=track][data-band=high]', state: 'visible' } },
  { assert: { selector: '[data-part=track]', state: 'visible' } },
  { wait: 700 },

  // Back down the same channel: nearly all of it is empty now, and it is the same box it was.
  { moveTo: '[data-part=thumb]' },
  { drag: { to: '[data-part=aim-low]' } },
  { wait: 500 },
  { assert: { selector: '[data-part=track][data-band=low]', state: 'visible' } },
  { wait: 800 },

  // The scrollbar's version of the same part: no fill, because the thumb's own width
  // already says how much of the content fits, and its position says which part.
  { moveTo: '[data-part=pane]' },
  { scroll: { x: 100 } },
  { wait: 500 },
  { assert: { selector: '[data-part=bar][data-at=mid]', state: 'visible' } },
  { assert: { selector: '[data-part=bar-thumb]', state: 'visible' } },
  { wait: 600 },

  { scroll: { x: 220 } },
  { wait: 500 },
  { assert: { selector: '[data-part=bar][data-at=end]', state: 'visible' } },
  { assert: { selector: '[data-part=track][data-band=low]', state: 'visible' } },
  { wait: 800 },
]);
