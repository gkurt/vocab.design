import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The frame fades in from mount, so the table is read after it has settled.
  { wait: 700 },
  { assert: { selector: '[data-part=summary-4193]', state: 'visible' } },
  { assert: { selector: '[data-part=drawer-4193]', state: 'hidden' } },
  { wait: 400 },

  // The twisty in the row opens the panel under that row. The row itself does not move.
  { moveTo: '[data-part=toggle-4193]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=row-4193][data-open]', state: 'visible' } },
  { assert: { selector: '[data-part=drawer-4193]', state: 'visible' } },
  { assert: { selector: '[data-part=summary-4194]', state: 'visible' } },
  { wait: 1000 },

  // Opening another row shuts the first: one open at a time, so the distance between
  // two rows never depends on what is open above them.
  { moveTo: '[data-part=toggle-4194]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=row-4194][data-open]', state: 'visible' } },
  { assert: { selector: '[data-part=drawer-4194]', state: 'visible' } },
  { assert: { selector: '[data-part=drawer-4193]', state: 'hidden' } },
  { wait: 1000 },

  // Collapsing is its own explicit step, and the rows are exactly where they were.
  { moveTo: '[data-part=collapse]' },
  { click: true },
  { wait: 650 },
  { assert: { selector: '[data-part=drawer-4194]', state: 'hidden' } },
  { assert: { selector: '[data-part=summary-4192]', state: 'visible' } },
  { wait: 700 },
]);
