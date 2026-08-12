import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The layer is on stage at rest, so the pose shows the term rather than the bare picture.
  { assert: { selector: '[data-part=scrim][data-scrim="gradient"]', state: 'visible' } },
  { wait: 900 },
  // Each segment names an absolute state, so the script never depends on what it found.
  { moveTo: '[data-part=seg-none]' },
  { click: true },
  { wait: 300 },
  { assert: { selector: '[data-part=scrim]', state: 'hidden' } },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-solid]' },
  { click: true },
  { wait: 300 },
  { assert: { selector: '[data-part=scrim][data-scrim="solid"]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-gradient]' },
  { click: true },
  { wait: 300 },
  { assert: { selector: '[data-part=scrim][data-scrim="gradient"]', state: 'visible' } },
  { wait: 1100 },
]);
