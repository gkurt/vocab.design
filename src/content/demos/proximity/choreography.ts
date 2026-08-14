import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=fields]', state: 'visible' } },
  // Mounted on the honest state: nearness alone, nothing drawn.
  { assert: { selector: '[data-part=fields][data-mode=spacing]', state: 'visible' } },
  { assert: { selector: '[data-part=group-1][data-boxed]', state: 'hidden' } },
  { wait: 800 },
  { moveTo: '[data-part=seg-even]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=seg-even][aria-selected="true"]', state: 'visible' } },
  // Same six items, one gap everywhere, and the pairs stop being visible.
  { assert: { selector: '[data-part=fields][data-mode=even]', state: 'visible' } },
  { assert: { selector: '[data-part=label-3]', state: 'visible' } },
  { assert: { selector: '[data-part=field-3]', state: 'visible' } },
  { assert: { selector: '[data-part=group-1][data-boxed]', state: 'hidden' } },
  { wait: 1100 },
  { moveTo: '[data-part=seg-boxes]' },
  { click: true },
  { wait: 700 },
  // Enclosure grouping the same items, which is a different principle.
  { assert: { selector: '[data-part=fields][data-mode=boxes]', state: 'visible' } },
  { assert: { selector: '[data-part=group-1][data-boxed]', state: 'visible' } },
  { assert: { selector: '[data-part=group-3][data-boxed]', state: 'visible' } },
  { wait: 1100 },
  // Each segment names an arrangement, so the way back is an arrangement too.
  { moveTo: '[data-part=seg-spacing]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=fields][data-mode=spacing]', state: 'visible' } },
  { assert: { selector: '[data-part=group-1][data-boxed]', state: 'hidden' } },
  { assert: { selector: '[data-part=fields]', state: 'visible' } },
  { wait: 800 },
]);
