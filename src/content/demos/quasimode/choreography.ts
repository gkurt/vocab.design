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
  // The same drag, with the key really held across it: `withKey` puts the keydown at the open
  // of the scope and the keyup at its close, so the mode is opened by a key, spans the drag,
  // and ends when the key comes up. The pan is the durable evidence that the mode was on,
  // since the badge is already gone by the time this is judged.
  {
    withKey: {
      key: 'Space',
      steps: [{ moveTo: '[data-part=mark-a]' }, { wait: 400 }, { drag: { to: '[data-part=pan-to]' } }, { wait: 400 }],
    },
  },
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
