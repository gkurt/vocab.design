import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=menu]', state: 'hidden' } },
  { moveTo: '[data-part=row-2]' },
  { rightClick: true },
  // Scoped to the row it came from, and placed where the pointer asked for it.
  { assert: { selector: '[data-part=menu]', state: 'visible' } },
  { assert: { selector: '[data-part=row-2][data-selected]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=menu-open]' },
  { wait: 400 },
  { click: true },
  { assert: { selector: '[data-part=menu]', state: 'hidden' } },
  { wait: 1000 },
]);
