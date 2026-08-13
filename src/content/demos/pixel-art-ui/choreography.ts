import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=panel]', state: 'visible' } },
  { assert: { selector: '[data-part=sprite]', state: 'visible' } },
  { assert: { selector: '[data-part=hp]', state: 'visible' } },
  { assert: { selector: '[data-part=row-item][data-selected]', state: 'visible' } },
  { wait: 800 },
  // Each row names itself, so the caret lands on that row rather than stepping down.
  { moveTo: '[data-part=row-magic]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=row-magic][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=caret-magic]', state: 'visible' } },
  { assert: { selector: '[data-part=caret-item]', state: 'hidden' } },
  { wait: 800 },
  { moveTo: '[data-part=row-item]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=row-item][data-selected]', state: 'visible' } },
  { wait: 600 },
]);
