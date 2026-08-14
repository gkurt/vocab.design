import { steps } from '#src/stage/choreography.ts';

// Poster, then the buffer nobody asks for, then the picture with its captions on.
// Each control reaches one state: the glyph starts it, Stall drops it back to
// buffering, the bar's transport is the only thing that pauses (SPEC §8).
export default steps([
  { assert: { selector: '[data-part=player][data-state=paused]', state: 'visible' } },
  { assert: { selector: '[data-part=overlay]', state: 'visible' } },
  { moveTo: '[data-part=play]' },
  { wait: 450 },
  { click: true },
  { assert: { selector: '[data-part=player][data-state=buffering]', state: 'visible' } },
  { wait: 1100 },
  { assert: { selector: '[data-part=player][data-state=playing]', state: 'visible' } },
  { assert: { selector: '[data-part=caption-line]', state: 'visible' } },
  { assert: { selector: '[data-part=overlay]', state: 'hidden' } },
  { wait: 1400 },
  { moveTo: '[data-part=stall]' },
  { wait: 400 },
  { click: true },
  { assert: { selector: '[data-part=player][data-state=buffering]', state: 'visible' } },
  { wait: 1100 },
  { assert: { selector: '[data-part=player][data-state=playing]', state: 'visible' } },
  { moveTo: '[data-part=transport]' },
  { wait: 400 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=player][data-state=paused]', state: 'visible' } },
  { assert: { selector: '[data-part=overlay]', state: 'visible' } },
  { wait: 800 },
]);
