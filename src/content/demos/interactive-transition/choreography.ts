import { steps } from '#src/stage/choreography.ts';

// Four gestures, each reaching a named outcome rather than flipping one: a pull abandoned short of
// halfway, a pull carried past it, a push back abandoned short of halfway, and a push carried past
// it. The settle is 300 ms, so every detent claim is given nine hundred, and the outcome attributes
// are written the instant the finger lifts, which is what the claims immediately after a drag read.
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=scene][data-detent=collapsed]', state: 'visible' } },
  { assert: { selector: '[data-part=sheet][data-state=rested]', state: 'visible' } },
  { assert: { selector: '[data-part=grabber]', state: 'visible' } },
  { assert: { selector: '[data-part=pct]', state: 'visible' } },

  // Pulled a third of the way up and released: the transition runs backwards.
  { moveTo: '[data-part=grabber]' },
  { wait: 500 },
  { drag: { to: '[data-part=dot-mid]' } },
  { assert: { selector: '[data-part=scene][data-partway=seen]', state: 'visible' } },
  { assert: { selector: '[data-part=scene][data-outcome=reversed]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=scene][data-detent=collapsed]', state: 'visible' } },

  // Carried past halfway and released: the transition finishes itself.
  { moveTo: '[data-part=grabber]' },
  { wait: 500 },
  { drag: { to: '[data-part=dot-top]' } },
  { assert: { selector: '[data-part=scene][data-outcome=completed]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=scene][data-detent=expanded]', state: 'visible' } },

  // The same two endings in the other direction, which is the reversibility the term is about.
  { moveTo: '[data-part=grabber]' },
  { wait: 500 },
  { drag: { to: '[data-part=dot-near]' } },
  { assert: { selector: '[data-part=scene][data-outcome=reversed]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=scene][data-detent=expanded]', state: 'visible' } },

  { moveTo: '[data-part=grabber]' },
  { wait: 500 },
  { drag: { to: '[data-part=dot-mid]' } },
  { assert: { selector: '[data-part=scene][data-outcome=completed]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=scene][data-detent=collapsed]', state: 'visible' } },
  { assert: { selector: '[data-part=sheet][data-state=rested]', state: 'visible' } },
  { wait: 700 },
]);
