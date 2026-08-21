import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 600 },
  { assert: { selector: '[data-part=stepped]', state: 'visible' } },
  // The demo ticks once from mount: three seconds plus a 60ms lead plus a settling beat.
  // Replay is pressed only after that run has landed, so the hands are never sent back to
  // zero while the reader is still watching them travel (SPEC §8).
  { wait: 2900 },
  { assert: { selector: '[data-part=scene][data-state=rested]', state: 'visible' } },
  // Replay names a run rather than toggling one, so a resumed pass lands where it said.
  { moveTo: '[data-part=replay]' },
  { click: true },
  // The run is three seconds long, so the post-click beat lands well inside it.
  { assert: { selector: '[data-part=scene][data-state=ticking]', state: 'visible' } },
  { wait: 3300 },
  { assert: { selector: '[data-part=scene][data-state=rested]', state: 'visible' } },
  { assert: { selector: '[data-part=strip]', state: 'visible' } },
  // The hand itself rests vertical: a zero-width line box reads as absent, so the
  // claim lands on the dial that carries it.
  { assert: { selector: '[data-part=dial-step]', state: 'visible' } },
  { wait: 600 },
]);
