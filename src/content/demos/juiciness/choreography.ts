import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, and nothing autoplays: the press owns the only run.
  { wait: 500 },
  { assert: { selector: '[data-part=like][data-mode=juicy]', state: 'visible' } },
  { assert: { selector: '[data-part=scene][data-stack="0"]', state: 'visible' } },

  // The term: one press, six answers. The count of them is the claim, since juiciness is
  // the size of the pile rather than any one effect in it.
  { moveTo: '[data-part=like]' },
  { wait: 400 },
  { click: true },
  { assert: { selector: '[data-part=scene][data-stack="6"]', state: 'visible' } },
  { assert: { selector: '[data-part=resp-sparks][data-lit]', state: 'visible' } },
  { assert: { selector: '[data-part=resp-settle][data-lit]', state: 'visible' } },
  { assert: { selector: '[data-part=count][data-bumped]', state: 'visible' } },
  // The tail outlasts every run the click started, so nothing is cut mid-flight.
  { wait: 1400 },

  // The same act with the pile taken away. Both are usable; the difference is the whole
  // term, which is why the comparison is in the specimen rather than in the caption.
  { moveTo: '[data-part=seg-plain]' },
  { wait: 400 },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=like][data-mode=plain]', state: 'visible' } },
  { moveTo: '[data-part=like]' },
  { wait: 400 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=scene][data-stack="1"]', state: 'visible' } },
  { assert: { selector: '[data-part=resp-count][data-lit]', state: 'visible' } },
  { assert: { selector: '[data-part=resp-sparks][data-lit]', state: 'hidden' } },
  { wait: 1100 },

  // Back to Juicy, so the pass rests where the subject is being the term.
  { moveTo: '[data-part=seg-juicy]' },
  { wait: 400 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=like][data-mode=juicy]', state: 'visible' } },
  { wait: 900 },
]);
