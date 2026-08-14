import { steps } from '#src/stage/choreography.ts';

export default steps([
  // A setup with a step left in it: nothing to celebrate yet.
  { assert: { selector: '[data-part=burst][data-burst=idle]', state: 'visible' } },
  { wait: 500 },
  { moveTo: '[data-part=finish]' },
  { click: true },
  // Judged a third of a second into a burst that lasts about one: the celebration
  // only exists between the completion and the fall, so a finished run proves nothing.
  { assert: { selector: '[data-part=burst][data-burst=fired]', state: 'visible' } },
  // The completion carries itself. Confetti is decoration, so the state it decorates
  // has to be readable with the paper gone.
  { assert: { selector: '[data-part=finish][data-done]', state: 'visible' } },
  { wait: 1500 },
  // Well past the burst: it is over and it left nothing behind.
  { assert: { selector: '[data-part=burst][data-burst=fired]', state: 'hidden' } },
  { wait: 700 },
]);
