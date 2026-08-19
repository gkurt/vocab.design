import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The window fades in from mount, so the first reading waits for it.
  { wait: 700 },
  { assert: { selector: '[data-part=thumb-1][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=preview][data-frame="1"]', state: 'visible' } },
  { wait: 400 },

  // Picking in the rail changes the pane, and the current marker travels with it.
  { moveTo: '[data-part=thumb-4]' },
  { click: true },
  { wait: 650 },
  { assert: { selector: '[data-part=thumb-4][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=preview][data-frame="4"]', state: 'visible' } },
  { assert: { selector: '[data-part=thumb-1][data-selected]', state: 'hidden' } },
  { wait: 900 },

  // The rail holds more than fits and scrolls on its own, without the pane moving.
  { moveTo: '[data-part=rail]' },
  { scroll: { y: 260 } },
  { wait: 700 },
  { assert: { selector: '[data-part=preview][data-frame="4"]', state: 'visible' } },

  // A frame that was past the rail's edge a moment ago.
  { moveTo: '[data-part=thumb-7]' },
  { click: true },
  { wait: 650 },
  { assert: { selector: '[data-part=thumb-7][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=preview][data-frame="7"]', state: 'visible' } },
  { wait: 900 },

  // Back to the head of the roll.
  { moveTo: '[data-part=rail]' },
  { scroll: { y: -260 } },
  { wait: 600 },
  { moveTo: '[data-part=thumb-1]' },
  { click: true },
  { wait: 650 },
  { assert: { selector: '[data-part=preview][data-frame="1"]', state: 'visible' } },
  { assert: { selector: '[data-part=thumb-7][data-selected]', state: 'hidden' } },
  { wait: 700 },
]);
