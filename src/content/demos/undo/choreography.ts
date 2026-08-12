import { steps } from '#src/stage/choreography.ts';

// Both halves of the offer, in order: taken, then left to lapse. Sending is not a
// toggle, so each pass starts from a fresh draft and sends at most twice (SPEC §8).
export default steps([
  { assert: { selector: '[data-part=toast]', state: 'hidden' } },
  { moveTo: '[data-part=send]' },
  { wait: 300 },
  { click: true },
  { wait: 450 },
  { assert: { selector: '[data-part=toast]', state: 'visible' } },
  { assert: { selector: '[data-part=outgoing]', state: 'visible' } },
  { wait: 900 },
  // The way back, taken: the row goes and the draft returns to the composer.
  { moveTo: '[data-part=undo]' },
  { click: true },
  { wait: 450 },
  { assert: { selector: '[data-part=outgoing]', state: 'hidden' } },
  { assert: { selector: '[data-part=toast]', state: 'hidden' } },
  { wait: 900 },
  // The way back, left to expire. What lapses is the offer, not the message.
  { moveTo: '[data-part=send]' },
  { click: true },
  { wait: 450 },
  { assert: { selector: '[data-part=toast]', state: 'visible' } },
  { wait: 3600 },
  { assert: { selector: '[data-part=toast]', state: 'hidden' } },
  { assert: { selector: '[data-part=delivered]', state: 'visible' } },
  { wait: 900 },
]);
