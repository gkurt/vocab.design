import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=region][data-density=comfortable]', state: 'visible' } },
  { assert: { selector: '[data-part=row-4][data-clipped]', state: 'visible' } },
  { moveTo: '[data-part=seg-compact]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=seg-compact][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=region][data-density=compact]', state: 'visible' } },
  // Same rows, same box, tighter spacing: the fourth row is inside it now.
  { assert: { selector: '[data-part=row-4][data-clipped]', state: 'hidden' } },
  // Density buys rows, it does not make the box endless.
  { assert: { selector: '[data-part=row-8][data-clipped]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=seg-comfortable]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=region][data-density=comfortable]', state: 'visible' } },
  { assert: { selector: '[data-part=row-4][data-clipped]', state: 'visible' } },
  { wait: 700 },
]);
