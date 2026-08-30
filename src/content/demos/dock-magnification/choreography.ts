import { steps } from '#src/stage/choreography.ts';

// Two fixed places in the dock's strip and one above it, so the pass proves both halves of
// the term: the bulge that follows the pointer along the row, and the row going flat again
// the moment the pointer leaves the strip.
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=dock][data-mag=off]', state: 'visible' } },
  { assert: { selector: '[data-part=baseline]', state: 'visible' } },
  { moveTo: '[data-part=tile-3]' },
  { wait: 600 },
  { assert: { selector: '[data-part=dock][data-mag=on]', state: 'visible' } },
  { moveTo: '[data-part=tile-6]' },
  { wait: 700 },
  { assert: { selector: '[data-part=dock][data-mag=on]', state: 'visible' } },
  { assert: { selector: '[data-part=tile-1]', state: 'visible' } },
  { wait: 500 },
  { moveTo: '[data-part=away]' },
  { wait: 700 },
  { assert: { selector: '[data-part=dock][data-mag=off]', state: 'visible' } },
  { wait: 800 },
]);
