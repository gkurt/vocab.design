import { steps } from '#src/stage/choreography.ts';

/**
 * Shape A is on stage from mount, so the pose already shows a blob. Each segment names one
 * shape outright, so a pass joined halfway lands on the same state (SPEC §8). The asserts
 * read the state attribute, which lands with the click rather than with the transition.
 */
export default steps([
  { assert: { selector: '[data-part=blob-fill][data-shape="a"]', state: 'visible' } },
  { assert: { selector: '[data-part=blob-ring]', state: 'visible' } },
  { assert: { selector: '[data-part=radii]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=seg-b]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=blob-fill][data-shape="b"]', state: 'visible' } },
  { assert: { selector: '[data-part=seg-b][aria-selected="true"]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=seg-a]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=blob-fill][data-shape="a"]', state: 'visible' } },
  { assert: { selector: '[data-part=seg-a][aria-selected="true"]', state: 'visible' } },
  { wait: 800 },
]);
