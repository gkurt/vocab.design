import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The frame fades in from mount, so the grid is read after it has settled.
  { wait: 700 },
  { assert: { selector: '[data-part=grid][data-open=none]', state: 'visible' } },
  { assert: { selector: '[data-part=row-leeds]', state: 'hidden' } },
  { wait: 300 },

  // The twisty opens child rows, not a panel: the same four columns, one level in.
  { moveTo: '[data-part=twisty-north]' },
  { click: true },
  { wait: 650 },
  { assert: { selector: '[data-part=row-leeds]', state: 'visible' } },
  { assert: { selector: '[data-part=cell-york-spend]', state: 'visible' } },
  { assert: { selector: '[data-part=row-west]', state: 'visible' } },
  { wait: 800 },

  // Cell navigation is the other half of the term. The ring starts where it is clicked.
  { moveTo: '[data-part=cell-north-owner]' },
  { click: true },
  { wait: 450 },
  { assert: { selector: '[data-part=cell-north-owner][data-sim-focus]', state: 'visible' } },
  { wait: 400 },

  // Down walks straight into the child rows, because they are rows in this grid.
  { press: 'ArrowDown' },
  { wait: 500 },
  { assert: { selector: '[data-part=cell-leeds-owner][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=cell-north-owner][data-sim-focus]', state: 'hidden' } },
  { wait: 400 },
  { press: 'ArrowDown' },
  { wait: 500 },
  { assert: { selector: '[data-part=cell-york-owner][data-sim-focus]', state: 'visible' } },
  { wait: 400 },

  // And across the columns, which is what makes it a grid rather than a tree.
  { press: 'ArrowRight' },
  { wait: 500 },
  { assert: { selector: '[data-part=cell-york-spend][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=cell-york-owner][data-sim-focus]', state: 'hidden' } },
  { wait: 800 },

  // On a shut row's header, Right opens the row rather than moving the ring.
  { moveTo: '[data-part=cell-west-region]' },
  { click: true },
  { wait: 450 },
  { press: 'ArrowRight' },
  { wait: 650 },
  { assert: { selector: '[data-part=row-truro]', state: 'visible' } },
  { assert: { selector: '[data-part=cell-west-region][data-sim-focus]', state: 'visible' } },
  { wait: 800 },

  // Collapse all is the explicit way back, and it shuts both branches at once.
  { moveTo: '[data-part=collapse]' },
  { click: true },
  { wait: 650 },
  { assert: { selector: '[data-part=grid][data-open=none]', state: 'visible' } },
  { assert: { selector: '[data-part=row-truro]', state: 'hidden' } },
  { assert: { selector: '[data-part=row-leeds]', state: 'hidden' } },
  { wait: 800 },
]);
