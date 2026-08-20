import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 500 },
  { assert: { selector: '[data-part=sentence][data-base=rtl]', state: 'visible' } },
  { assert: { selector: '[data-part=run-2][data-base=rtl]', state: 'visible' } },
  // The visual order is read off the live layout, so this claim is the algorithm's
  // own answer: with the base direction declared, the runs draw 4 3 2 1.
  { assert: { selector: '[data-part=order][data-seq="4-3-2-1"]', state: 'visible' } },
  { assert: { selector: '[data-part=chip-4]', state: 'visible' } },
  // Absolute picks, never a flip: each segment names the declaration it reaches.
  { moveTo: '[data-part=seg-ltr]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=sentence][data-base=ltr]', state: 'visible' } },
  // Undeclared, the runs come out in the order they were typed. That is the bug.
  { assert: { selector: '[data-part=order][data-seq="1-2-3-4"]', state: 'visible' } },
  { assert: { selector: '[data-part=run-2][data-base=rtl]', state: 'hidden' } },
  { moveTo: '[data-part=readout]' },
  { wait: 700 },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  // The memory order never moved: the chips are the same four runs in both states.
  { assert: { selector: '[data-part=chip-1]', state: 'visible' } },
  // Ends declared, the state the subject's data-pose calls honest.
  { moveTo: '[data-part=seg-rtl]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=sentence][data-base=rtl]', state: 'visible' } },
  { assert: { selector: '[data-part=order][data-seq="4-3-2-1"]', state: 'visible' } },
  { wait: 700 },
]);
