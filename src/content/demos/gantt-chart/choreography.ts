import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claims wait for the chart to arrive.
  { wait: 550 },
  { assert: { selector: '[data-part=chart]', state: 'visible' } },
  { assert: { selector: '[data-part=deps]', state: 'visible' } },
  { assert: { selector: '[data-part=bar-wireframes][data-start="4"]', state: 'visible' } },
  { assert: { selector: '[data-part=bar-visual][data-start="8"]', state: 'visible' } },

  // One bar dragged two days later. The bar that waits on it goes with it, keeping the
  // gap the plan was drawn with, which is the whole reason the arrows are there.
  { moveTo: '[data-part=bar-wireframes]' },
  { wait: 450 },
  { drag: { to: '[data-part=drop]' } },
  { wait: 600 },
  { assert: { selector: '[data-part=bar-wireframes][data-start="6"]', state: 'visible' } },
  { assert: { selector: '[data-part=bar-visual][data-start="10"]', state: 'visible' } },
  { assert: { selector: '[data-part=field][data-moving=none]', state: 'visible' } },
  { assert: { selector: '[data-part=bar-build][data-start="9"]', state: 'visible' } },
  { wait: 1200 },
]);
