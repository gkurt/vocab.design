import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Both regions fade in from mount, so the first reading waits for them.
  { wait: 700 },
  { assert: { selector: '[data-part=overview][data-at=nw]', state: 'visible' } },
  { assert: { selector: '[data-part=detail][data-at=nw]', state: 'visible' } },
  { assert: { selector: '[data-part=box]', state: 'visible' } },
  { wait: 600 },

  // Move the detail, and the box on the overview follows: half of the coupling.
  { moveTo: '[data-part=detail]' },
  { scroll: { x: 420, y: 320 } },
  { wait: 800 },
  { assert: { selector: '[data-part=overview][data-at=se]', state: 'visible' } },
  { assert: { selector: '[data-part=detail][data-at=se]', state: 'visible' } },
  { wait: 700 },

  // Move the box, and the detail follows: the other half, which is what makes this the
  // layout rather than a one way minimap.
  { moveTo: '[data-part=box]' },
  { drag: { to: '[data-part=corner-nw]' } },
  { wait: 800 },
  { assert: { selector: '[data-part=detail][data-at=nw]', state: 'visible' } },
  { assert: { selector: '[data-part=overview][data-at=nw]', state: 'visible' } },
  { wait: 700 },

  { moveTo: '[data-part=box]' },
  { drag: { to: '[data-part=corner-se]' } },
  { wait: 800 },
  { assert: { selector: '[data-part=detail][data-at=se]', state: 'visible' } },
  { assert: { selector: '[data-part=overview][data-at=se]', state: 'visible' } },
  { wait: 700 },
]);
