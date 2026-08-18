import { steps } from '#src/stage/choreography.ts';

// Every gesture reaches a named outcome rather than flipping one: a stroke abandoned short of the
// commit point, a stroke carried past it, and finally a stroke with nothing left behind it to
// preview. The stack is pushed back at the end, so a resumed pass starts from the same screen.
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=device][data-top=article]', state: 'visible' } },
  { assert: { selector: '[data-part=device][data-outcome=none]', state: 'visible' } },
  { assert: { selector: '[data-part=screen]', state: 'visible' } },
  { assert: { selector: '[data-part=behind]', state: 'visible' } },

  // Peeled far enough to see the destination, then let go short of the commit point.
  { moveTo: '[data-part=edge-dot]' },
  { wait: 500 },
  { drag: { to: '[data-part=short-dot]' } },
  { assert: { selector: '[data-part=device][data-preview=seen]', state: 'visible' } },
  { assert: { selector: '[data-part=device][data-outcome=cancelled]', state: 'visible' } },
  { assert: { selector: '[data-part=device][data-top=article]', state: 'visible' } },
  { wait: 900 },

  // Carried past it: the screen that was behind becomes the screen in front.
  { moveTo: '[data-part=edge-dot]' },
  { wait: 500 },
  { drag: { to: '[data-part=far-dot]' } },
  { assert: { selector: '[data-part=device][data-outcome=committed]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=device][data-top=inbox]', state: 'visible' } },
  { assert: { selector: '[data-part=screen]', state: 'visible' } },

  { moveTo: '[data-part=edge-dot]' },
  { wait: 500 },
  { drag: { to: '[data-part=far-dot]' } },
  { wait: 900 },
  { assert: { selector: '[data-part=device][data-top=home]', state: 'visible' } },

  // Nothing further back, so there is nothing to draw underneath and the screen never moves.
  { moveTo: '[data-part=edge-dot]' },
  { wait: 500 },
  { drag: { to: '[data-part=far-dot]' } },
  { assert: { selector: '[data-part=device][data-outcome=blocked]', state: 'visible' } },
  { assert: { selector: '[data-part=device][data-top=home]', state: 'visible' } },
  { wait: 800 },

  { moveTo: '[data-part=reset]' },
  { wait: 400 },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=device][data-top=article]', state: 'visible' } },
  { assert: { selector: '[data-part=device][data-outcome=none]', state: 'visible' } },
  { wait: 700 },
]);
