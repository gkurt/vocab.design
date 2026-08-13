import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=card][data-verdict=none]', state: 'visible' } },
  // A stroke that stays inside the ring. Both ends are fixed points on the board, so the
  // gesture is the same length on every pass and the verdict cannot drift.
  { moveTo: '[data-part=card]' },
  { wait: 500 },
  { drag: { to: '[data-part=twitch]' } },
  { assert: { selector: '[data-part=card][data-verdict=click]', state: 'visible' } },
  { assert: { selector: '[data-part=card][data-state=idle]', state: 'visible' } },
  { wait: 1100 },
  // The same press, further: past the ring the gesture becomes a drag and the card follows.
  { moveTo: '[data-part=card]' },
  { wait: 500 },
  { drag: { to: '[data-part=shove]' } },
  { assert: { selector: '[data-part=card][data-verdict=drag]', state: 'visible' } },
  { wait: 1200 },
]);
