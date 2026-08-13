import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=card][data-face=front]', state: 'visible' } },
  { assert: { selector: '[data-part=card][data-state=settled]', state: 'visible' } },
  { moveTo: '[data-part=show-back]' },
  { click: true },
  // Judged mid-turn, but well past the halfway point where the card is edge on:
  // an element rotated to exactly 90 degrees has no box to be seen in.
  { wait: 150 },
  { assert: { selector: '[data-part=card][data-state=flipping]', state: 'visible' } },
  // Clear of the 620 ms turn, so the claim is about the face it lands on.
  { wait: 700 },
  { assert: { selector: '[data-part=card][data-face=back]', state: 'visible' } },
  { assert: { selector: '[data-part=card][data-state=settled]', state: 'visible' } },
  { wait: 600 },
  // The other face is an absolute state of its own, not a toggle back.
  { moveTo: '[data-part=show-front]' },
  { click: true },
  { wait: 850 },
  { assert: { selector: '[data-part=card][data-face=front]', state: 'visible' } },
  { assert: { selector: '[data-part=card][data-state=settled]', state: 'visible' } },
  { wait: 500 },
]);
