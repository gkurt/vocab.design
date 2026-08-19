import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The window fades in from mount, so the first reading of the division waits for it.
  { wait: 700 },
  { assert: { selector: '[data-part=pane][data-kind=fixed][data-stated=pane]', state: 'visible' } },
  { assert: { selector: '[data-part=pane][data-band=medium]', state: 'visible' } },
  { assert: { selector: '[data-part=splitter]', state: 'visible' } },
  { wait: 500 },

  // The boundary is draggable, and widening this pane takes the room from its neighbour.
  { moveTo: '[data-part=splitter]' },
  { drag: { to: '[data-part=stop-206]' } },
  { wait: 700 },
  { assert: { selector: '[data-part=pane][data-band=wide]', state: 'visible' } },
  { assert: { selector: '[data-part=detail]', state: 'visible' } },
  { wait: 600 },

  // Flexible is the same boundary stated from the other side: the reading pane holds the
  // number now, and this pane takes the remainder.
  { moveTo: '[data-part=seg-flexible]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=pane][data-kind=flexible][data-stated=other]', state: 'visible' } },
  { wait: 400 },
  { moveTo: '[data-part=splitter]' },
  { drag: { to: '[data-part=stop-112]' } },
  { wait: 700 },
  { assert: { selector: '[data-part=pane][data-kind=flexible][data-band=narrow]', state: 'visible' } },
  { wait: 600 },

  // Floating lifts the pane off the surface; the content behind keeps the whole window.
  { moveTo: '[data-part=seg-floating]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=pane][data-kind=floating]', state: 'visible' } },
  { assert: { selector: '[data-part=detail]', state: 'visible' } },
  { wait: 600 },

  // Semi permanent: real space while it is there, and the app bar can send it away.
  { moveTo: '[data-part=seg-semi]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=pane][data-kind=semi]', state: 'visible' } },
  { assert: { selector: '[data-part=hide]', state: 'visible' } },
  { wait: 400 },
  { moveTo: '[data-part=hide]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=pane]', state: 'hidden' } },
  { assert: { selector: '[data-part=show]', state: 'visible' } },
  { wait: 500 },
  { moveTo: '[data-part=show]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=pane][data-kind=semi]', state: 'visible' } },
  { wait: 700 },
]);
