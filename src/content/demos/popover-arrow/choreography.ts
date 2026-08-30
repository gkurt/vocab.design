import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The frame fades in from mount, so the map is read after it has settled.
  { wait: 700 },
  { assert: { selector: '[data-part=panel]', state: 'hidden' } },
  { wait: 400 },

  // A seat at the left edge: the panel cannot centre on it without leaving the frame,
  // so it is pushed right and the arrow slides left to keep pointing at the seat.
  { moveTo: '[data-part=seat-A1]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=panel]', state: 'visible' } },
  { assert: { selector: '[data-part=arrow][data-side=top][data-align=start]', state: 'visible' } },
  { wait: 900 },

  // The mirror case at the other end of the same row.
  { moveTo: '[data-part=seat-A6]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=arrow][data-side=top][data-align=end]', state: 'visible' } },
  { wait: 900 },

  // No room under the bottom row: the panel flips above its anchor and the arrow
  // changes edge, back at the centre now that the panel fits without being pushed.
  { moveTo: '[data-part=seat-C3]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=arrow][data-side=bottom][data-align=centre]', state: 'visible' } },
  { wait: 1000 },

  // Dismissal is explicit: the panel's own Close. The evidence is the panel going.
  { moveTo: '[data-part=close]' },
  { click: true },
  { wait: 550 },
  { assert: { selector: '[data-part=panel]', state: 'hidden' } },
  { wait: 500 },

  // Opened once more and dismissed the other way, on the empty run under the map.
  { moveTo: '[data-part=seat-B2]' },
  { click: true },
  { wait: 650 },
  { assert: { selector: '[data-part=arrow][data-side=top]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=aim-away]' },
  { click: true },
  { wait: 550 },
  { assert: { selector: '[data-part=panel]', state: 'hidden' } },
  { wait: 600 },
]);
