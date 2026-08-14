import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=minimap]', state: 'visible' } },
  { assert: { selector: '[data-part=minimap][data-at=start]', state: 'visible' } },
  { wait: 700 },
  // Scrolling the pane moves the slab: the map mirrors, which is its first job.
  { moveTo: '[data-part=viewport]' },
  { scroll: { y: 200 } },
  { wait: 600 },
  { assert: { selector: '[data-part=minimap][data-at=middle]', state: 'visible' } },
  { wait: 800 },
  // Dragging the slab scrolls the pane: the map is a control, which is its second job.
  { moveTo: '[data-part=slab]' },
  { wait: 300 },
  { drag: { to: '[data-part=map-foot]' } },
  { wait: 600 },
  { assert: { selector: '[data-part=minimap][data-at=end]', state: 'visible' } },
  { wait: 900 },
  // Clicking the strip jumps: the whole document is a target, not just the slab.
  { moveTo: '[data-part=map-top]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=minimap][data-at=start]', state: 'visible' } },
  { assert: { selector: '[data-part=slab]', state: 'visible' } },
  { wait: 800 },
]);
