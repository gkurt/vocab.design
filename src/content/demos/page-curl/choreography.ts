import { steps } from '#src/stage/choreography.ts';

// The book rests flat at mount, so the script opens after the kit's fade. Turn reaches the turned
// spread and Back reaches the flat one, so neither step flips whatever it finds (SPEC §8). The turn
// runs 900 ms, so the beat after each click lands well inside it.
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=scene][data-page="1"][data-state=rested]', state: 'visible' } },
  { assert: { selector: '[data-part=page]', state: 'visible' } },
  { assert: { selector: '[data-part=leaf]', state: 'visible' } },

  { moveTo: '[data-part=turn]' },
  { click: true },
  { assert: { selector: '[data-part=scene][data-state=turning]', state: 'visible' } },
  { assert: { selector: '[data-part=fold]', state: 'visible' } },
  { wait: 1300 },
  // The leaf has landed on the other side of the spine, reverse side up.
  { assert: { selector: '[data-part=scene][data-page="2"][data-state=rested]', state: 'visible' } },
  { assert: { selector: '[data-part=flap]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },

  { wait: 600 },
  { moveTo: '[data-part=back]' },
  { click: true },
  { assert: { selector: '[data-part=scene][data-state=turning]', state: 'visible' } },
  { wait: 1300 },
  { assert: { selector: '[data-part=scene][data-page="1"][data-state=rested]', state: 'visible' } },
  { assert: { selector: '[data-part=leaf]', state: 'visible' } },
  { wait: 700 },
]);
