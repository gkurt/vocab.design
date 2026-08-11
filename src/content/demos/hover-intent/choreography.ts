import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=menu-gated]', state: 'hidden' } },
  // The ungated trigger acts on the hover the moment it lands.
  { moveTo: '[data-part=eager]' },
  { wait: 300 },
  { assert: { selector: '[data-part=menu-eager]', state: 'visible' } },
  { moveTo: '[data-part=page]' },
  { wait: 500 },
  { assert: { selector: '[data-part=menu-eager]', state: 'hidden' } },
  // The gated one is hovered here, and still holding its dwell.
  { moveTo: '[data-part=gated]' },
  { wait: 150 },
  { assert: { selector: '[data-part=menu-gated]', state: 'hidden' } },
  // Same hover, held past the dwell: now it counts.
  { wait: 800 },
  { assert: { selector: '[data-part=menu-gated]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=page]' },
  { wait: 600 },
  { assert: { selector: '[data-part=menu-gated]', state: 'hidden' } },
  { wait: 800 },
]);
