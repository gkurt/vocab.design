import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The page fades in from mount, so the first reading of the shelves waits for it.
  { wait: 700 },
  { assert: { selector: '[data-part=shelf-b][data-at=start]', state: 'visible' } },
  { assert: { selector: '[data-part=shelf-a][data-at=start]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-at=start]', state: 'visible' } },
  { wait: 500 },

  // The subject row is browsed sideways. The rows above and below it do not follow.
  { moveTo: '[data-part=shelf-b]' },
  { scroll: { x: 300 } },
  { wait: 700 },
  { assert: { selector: '[data-part=shelf-b][data-at=mid]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-at=mid]', state: 'visible' } },
  { assert: { selector: '[data-part=shelf-a][data-at=start]', state: 'visible' } },
  { wait: 600 },

  // The far end of the row, which is where a shelf keeps most of its catalogue.
  { scroll: { x: 900 } },
  { wait: 800 },
  { assert: { selector: '[data-part=shelf-b][data-at=end]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-at=end]', state: 'visible' } },
  { wait: 700 },

  // Another row, scrolled independently: the one above it stays where the reader left it.
  { moveTo: '[data-part=shelf-a]' },
  { scroll: { x: 420 } },
  { wait: 700 },
  { assert: { selector: '[data-part=shelf-a][data-at=mid]', state: 'visible' } },
  { assert: { selector: '[data-part=shelf-b][data-at=end]', state: 'visible' } },
  { wait: 700 },

  // Both rows back to their heads, so the pass ends where it started.
  { scroll: { x: -600 } },
  { wait: 600 },
  { assert: { selector: '[data-part=shelf-a][data-at=start]', state: 'visible' } },
  { moveTo: '[data-part=shelf-b]' },
  { scroll: { x: -1400 } },
  { wait: 700 },
  { assert: { selector: '[data-part=shelf-b][data-at=start]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-at=start]', state: 'visible' } },
  { wait: 600 },
]);
