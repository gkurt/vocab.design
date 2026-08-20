import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The frame fades in from mount, so the first reading of the arrangement waits for it.
  { wait: 700 },
  { assert: { selector: '[data-part=stack][data-pattern=alternating]', state: 'visible' } },
  { assert: { selector: '[data-part=row-2][data-side=right]', state: 'visible' } },
  { assert: { selector: '[data-part=row-3][data-side=left]', state: 'visible' } },
  { wait: 600 },

  // Every picture hard left: the same four rows, and nothing left to cross.
  { moveTo: '[data-part=seg-aligned]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=stack][data-pattern=aligned]', state: 'visible' } },
  { assert: { selector: '[data-part=row-2][data-side=left]', state: 'visible' } },
  { assert: { selector: '[data-part=row-4][data-side=left]', state: 'visible' } },
  { wait: 800 },

  // Back to the zigzag, where consecutive rows stop resembling each other.
  { moveTo: '[data-part=seg-zigzag]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=stack][data-pattern=alternating]', state: 'visible' } },
  { assert: { selector: '[data-part=row-4][data-side=right]', state: 'visible' } },
  { wait: 700 },
]);
