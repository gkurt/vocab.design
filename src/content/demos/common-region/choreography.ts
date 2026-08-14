import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Mount draws the boundary: the grouping is enclosure, and the gaps are even.
  { assert: { selector: '[data-part=group-a][data-grouped]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-spacing]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=seg-spacing][aria-selected="true"]', state: 'visible' } },
  // The boundary is gone; only the gap is grouping now, so the region has stopped
  // being one (the qualified selector has nothing to match).
  { assert: { selector: '[data-part=group-a][data-grouped]', state: 'hidden' } },
  { assert: { selector: '[data-part=group-a]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=seg-conflict]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=seg-conflict][aria-selected="true"]', state: 'visible' } },
  // Gaps now pair the items across the seam and the boundary overrules them.
  { assert: { selector: '[data-part=group-a][data-grouped]', state: 'visible' } },
  { wait: 1500 },
  { moveTo: '[data-part=seg-region]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=group-a][data-grouped]', state: 'visible' } },
  { wait: 900 },
]);
