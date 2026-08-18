import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 400 },
  { assert: { selector: '[data-part=trimmed][data-edge=cap]', state: 'visible' } },
  { assert: { selector: '[data-part=reference]', state: 'visible' } },
  { moveTo: '[data-part=declaration]' },
  { wait: 900 },
  { assert: { selector: '[data-part=declaration]', state: 'visible' } },
  { assert: { selector: '[data-part=removed]', state: 'visible' } },
  // Absolute picks, never a flip: each segment names the edge it trims down to, and
  // both of them are trims, so the subject is the term wherever the pass is joined.
  { moveTo: '[data-part=seg-ex]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=trimmed][data-edge=ex]', state: 'visible' } },
  { moveTo: '[data-part=caption]' },
  { wait: 1200 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { moveTo: '[data-part=seg-cap]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=trimmed][data-edge=cap]', state: 'visible' } },
  { wait: 800 },
]);
