import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claims wait for the scene to arrive.
  { wait: 500 },
  { assert: { selector: '[data-part=scene][data-menu=closed]', state: 'visible' } },
  { assert: { selector: '[data-part=menu]', state: 'hidden' } },

  // The term itself: one press that opens the menu, strokes down through the items, and
  // commits the one it is over when the button comes up. `data-swept=many` is what proves
  // the highlight tracked more than one item while the button stayed down, which is the
  // part of the gesture no state after the release could show.
  { moveTo: '[data-part=trigger]' },
  { wait: 450 },
  { drag: { to: '[data-part=item-name]', via: ['[data-part=enter-menu]'] } },
  { wait: 500 },
  { assert: { selector: '[data-part=scene][data-swept=many]', state: 'visible' } },
  { assert: { selector: '[data-part=scene][data-path=gesture]', state: 'visible' } },
  { assert: { selector: '[data-part=scene][data-choice=name]', state: 'visible' } },
  { assert: { selector: '[data-part=menu]', state: 'hidden' } },
  { wait: 1000 },

  // The contrast in the same specimen: press and release on the title without travelling,
  // and the menu is left standing for a second click to pick from.
  { moveTo: '[data-part=trigger]' },
  { wait: 400 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=menu][data-open]', state: 'visible' } },
  { assert: { selector: '[data-part=scene][data-path=sticky]', state: 'visible' } },
  { wait: 500 },
  { moveTo: '[data-part=item-size]' },
  { wait: 450 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=scene][data-path=clicks]', state: 'visible' } },
  { assert: { selector: '[data-part=scene][data-choice=size]', state: 'visible' } },
  { assert: { selector: '[data-part=menu]', state: 'hidden' } },
  { wait: 1000 },

  // The escape hatch: the same press, carried off the menu before it is let go, commits
  // nothing. The choice from the previous pass is still standing, which is the claim.
  { moveTo: '[data-part=trigger]' },
  { wait: 400 },
  { drag: { to: '[data-part=off-menu]', via: ['[data-part=enter-menu]'] } },
  { wait: 500 },
  { assert: { selector: '[data-part=scene][data-path=cancelled]', state: 'visible' } },
  { assert: { selector: '[data-part=scene][data-choice=size]', state: 'visible' } },
  { assert: { selector: '[data-part=menu]', state: 'hidden' } },
  { wait: 1100 },
]);
