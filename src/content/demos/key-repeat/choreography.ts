import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=track][data-index="0"]', state: 'visible' } },
  { assert: { selector: '[data-part=track][data-phase=idle]', state: 'visible' } },
  // One press, one step: a tap moves the caret exactly once.
  { moveTo: '[data-part=track]' },
  { wait: 400 },
  { press: 'ArrowRight' },
  { wait: 400 },
  { assert: { selector: '[data-part=track][data-index="1"]', state: 'visible' } },
  { assert: { selector: '[data-part=track][data-ran]', state: 'hidden' } },
  { wait: 600 },
  // The hold, performed: one keydown, the typematic delay, then repeat after
  // repeat until the keyup, with the chip counting them ("ArrowRight ×21").
  { holdKey: { key: 'ArrowRight', ms: 2400 } },
  { wait: 400 },
  // The caret ran to the end of the track: far more cells than distinct presses
  // were made, which is the term. Release put the phases back to rest.
  { assert: { selector: '[data-part=track][data-index="17"]', state: 'visible' } },
  { assert: { selector: '[data-part=track][data-ran]', state: 'visible' } },
  { assert: { selector: '[data-part=track][data-phase=idle]', state: 'visible' } },
  { wait: 1200 },
]);
