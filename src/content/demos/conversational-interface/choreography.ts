import { steps } from '#src/stage/choreography.ts';

// A screen with no controls on it has to advertise itself, so the chips are the menu bar:
// picking one takes a turn, the reply is composed, and the transcript is the state a turn
// later. A turn is never taken back, so a resumed pass lands the same way (SPEC §8).
export default steps([
  { wait: 600 },
  { assert: { selector: '[data-part=transcript]', state: 'visible' } },
  { assert: { selector: '[data-part=chips]', state: 'visible' } },
  { assert: { selector: '[data-part=user-turn]', state: 'hidden' } },
  { moveTo: '[data-part=chip-free]' },
  { wait: 400 },
  { click: true },
  { wait: 450 },
  { assert: { selector: '[data-part=user-turn]', state: 'visible' } },
  { assert: { selector: '[data-part=typing]', state: 'visible' } },
  { assert: { selector: '[data-part=chips]', state: 'hidden' } },
  { wait: 1400 },
  { assert: { selector: '[data-part=reply]', state: 'visible' } },
  { assert: { selector: '[data-part=typing]', state: 'hidden' } },
  { assert: { selector: '[data-part=chips-2]', state: 'visible' } },
  { wait: 1000 },
]);
