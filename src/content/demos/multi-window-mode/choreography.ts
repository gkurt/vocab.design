import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 700 },
  // The whole screen: no neighbour, no divider, the app running expanded.
  { assert: { selector: '[data-part=app][data-mode=single]', state: 'visible' } },
  { assert: { selector: '[data-part=app][data-size=expanded]', state: 'visible' } },
  { assert: { selector: '[data-part=neighbour]', state: 'hidden' } },
  { assert: { selector: '[data-part=divider]', state: 'hidden' } },
  { wait: 1000 },
  // Split screen: the same tablet, two apps, and a divider between them.
  { moveTo: '[data-part=seg-split]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=app][data-mode=split]', state: 'visible' } },
  { assert: { selector: '[data-part=neighbour]', state: 'visible' } },
  { assert: { selector: '[data-part=divider]', state: 'visible' } },
  { assert: { selector: '[data-part=rail]', state: 'visible' } },
  { wait: 1000 },
  // Dragged toward the rail: the window shrinks past its limit and the app runs compact.
  { moveTo: '[data-part=divider]' },
  { drag: { to: '[data-part=rail]' } },
  { wait: 800 },
  { assert: { selector: '[data-part=app][data-size=compact]', state: 'visible' } },
  { assert: { selector: '[data-part=rail]', state: 'hidden' } },
  { assert: { selector: '[data-part=neighbour]', state: 'visible' } },
  { wait: 1500 },
  // Freeform: the neighbour floats over the screen instead of dividing it.
  { moveTo: '[data-part=seg-floating]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=app][data-mode=floating]', state: 'visible' } },
  { assert: { selector: '[data-part=neighbour]', state: 'visible' } },
  { assert: { selector: '[data-part=divider]', state: 'hidden' } },
  { assert: { selector: '[data-part=rail]', state: 'visible' } },
  { wait: 1500 },
  // Back to the whole screen.
  { moveTo: '[data-part=seg-single]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=app][data-mode=single]', state: 'visible' } },
  { assert: { selector: '[data-part=neighbour]', state: 'hidden' } },
  { wait: 800 },
]);
