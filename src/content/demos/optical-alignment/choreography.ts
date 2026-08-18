import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 600 },
  // Mount is the corrected placement: the shapes sit where they look right.
  { assert: { selector: '[data-part=arena][data-mode=optical]', state: 'visible' } },
  { assert: { selector: '[data-part=shape-triangle][data-mode=optical]', state: 'visible' } },
  { assert: { selector: '[data-part=nudge-triangle]', state: 'visible' } },
  { wait: 1000 },
  // Metric is what the numbers alone produce, and it is the state the eye argues with.
  { moveTo: '[data-part=seg-metric]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=seg-metric][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=arena][data-mode=metric]', state: 'visible' } },
  { assert: { selector: '[data-part=shape-triangle][data-mode=metric]', state: 'visible' } },
  { assert: { selector: '[data-part=shape-square][data-mode=metric]', state: 'visible' } },
  { wait: 1600 },
  // Each segment names a placement, so the way back is a placement too, not an undo.
  { moveTo: '[data-part=seg-optical]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=seg-optical][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=arena][data-mode=optical]', state: 'visible' } },
  { assert: { selector: '[data-part=shape-triangle][data-mode=optical]', state: 'visible' } },
  { assert: { selector: '[data-part=shape-circle][data-mode=optical]', state: 'visible' } },
  { wait: 1200 },
]);
