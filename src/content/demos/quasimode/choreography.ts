import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to arrive.
  { wait: 500 },
  { assert: { selector: '[data-part=canvas][data-mode=select]', state: 'visible' } },
  { assert: { selector: '[data-part=mode-chip]', state: 'hidden' } },
  // With nothing held, a drag on the canvas means what the canvas means at rest.
  { moveTo: '[data-part=mark-a]' },
  { wait: 500 },
  { drag: { to: '[data-part=mark-b]' } },
  { wait: 400 },
  { assert: { selector: '[data-part=canvas][data-did=selected]', state: 'visible' } },
  { assert: { selector: '[data-part=canvas][data-mode=select]', state: 'visible' } },
  { wait: 900 },
  // The same drag with the key held down. A drag is the one step the player holds through,
  // so the hold and the pan are one gesture: the mode opens on the press, the world moves
  // while it is open, and the release closes it. The pan is the durable evidence that the
  // mode was on, since the badge is already gone by the time this is judged.
  { moveTo: '[data-part=hold-key]' },
  { wait: 500 },
  { drag: { to: '[data-part=pan-to]' } },
  { wait: 400 },
  { assert: { selector: '[data-part=canvas][data-did=panned]', state: 'visible' } },
  { assert: { selector: '[data-part=canvas][data-mode=select]', state: 'visible' } },
  { assert: { selector: '[data-part=mode-chip]', state: 'hidden' } },
  { wait: 1100 },
  // A tap of the real key: the mode is a keydown and a keyup apart, and is over already.
  { moveTo: '[data-part=canvas]' },
  { wait: 400 },
  { press: 'Space' },
  { wait: 500 },
  { assert: { selector: '[data-part=canvas][data-mode=select]', state: 'visible' } },
  { assert: { selector: '[data-part=mode-chip]', state: 'hidden' } },
  { wait: 900 },
]);
