import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The frame fades in from mount, so the first reading of the column waits for it.
  { wait: 700 },
  { assert: { selector: '[data-part=row-3][data-state=focus]', state: 'visible' } },
  { assert: { selector: '[data-part=detail-3]', state: 'visible' } },
  // The compressed neighbours are the whole point: still there, still in order.
  { assert: { selector: '[data-part=title-1]', state: 'visible' } },
  { assert: { selector: '[data-part=title-6]', state: 'visible' } },
  { wait: 700 },

  // An absolute pick further down the column. The old focus compresses in place rather
  // than being replaced: its detail goes, its title stays.
  { moveTo: '[data-part=row-5]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=row-5][data-state=focus]', state: 'visible' } },
  { assert: { selector: '[data-part=detail-5]', state: 'visible' } },
  { assert: { selector: '[data-part=detail-3]', state: 'hidden' } },
  { assert: { selector: '[data-part=row-3][data-state=context]', state: 'visible' } },
  { assert: { selector: '[data-part=title-3]', state: 'visible' } },
  { wait: 800 },

  // The first notice, at the top of the column, with the context now entirely below it.
  { moveTo: '[data-part=row-1]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=row-1][data-state=focus]', state: 'visible' } },
  { assert: { selector: '[data-part=detail-1]', state: 'visible' } },
  { assert: { selector: '[data-part=title-5]', state: 'visible' } },
  { assert: { selector: '[data-part=detail-5]', state: 'hidden' } },
  { wait: 800 },

  { moveTo: '[data-part=row-3]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=row-3][data-state=focus]', state: 'visible' } },
  { assert: { selector: '[data-part=detail-3]', state: 'visible' } },
  { wait: 700 },
]);
