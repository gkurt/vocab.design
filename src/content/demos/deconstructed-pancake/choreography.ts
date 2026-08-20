import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The frame fades in from mount, so the first count waits for it.
  { wait: 700 },
  { assert: { selector: '[data-part=row][data-width=wide][data-rows=one]', state: 'visible' } },
  { assert: { selector: '[data-part=card-3]', state: 'visible' } },
  { wait: 600 },

  // Two across and one below, and the one below keeps the width it had.
  { moveTo: '[data-part=seg-medium]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=row][data-width=medium][data-rows=two]', state: 'visible' } },
  { assert: { selector: '[data-part=row][data-orphan=natural]', state: 'visible' } },
  { assert: { selector: '[data-part=card-3]', state: 'visible' } },
  { wait: 800 },

  // Narrower still: the wrap is progressive, so it passes through two on its way to one.
  { moveTo: '[data-part=seg-narrow]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=row][data-width=narrow][data-rows=three]', state: 'visible' } },
  { assert: { selector: '[data-part=card-1]', state: 'visible' } },
  { assert: { selector: '[data-part=card-3]', state: 'visible' } },
  { wait: 800 },

  // Back to the widest, where three across is an exact fit.
  { moveTo: '[data-part=seg-wide]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=row][data-width=wide][data-rows=one]', state: 'visible' } },
  { wait: 700 },
]);
