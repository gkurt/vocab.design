import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claims wait for the scene to settle.
  { wait: 700 },
  { assert: { selector: '[data-part=trace][data-mode=repeated]', state: 'visible' } },
  { assert: { selector: '[data-part=skipped]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-front]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=seg-front][data-selected]', state: 'visible' } },
  // Front-loaded: the fixations start at the left edge, and nothing is bypassed.
  { assert: { selector: '[data-part=trace][data-mode=front]', state: 'visible' } },
  { assert: { selector: '[data-part=skipped]', state: 'hidden' } },
  { wait: 1400 },
  { moveTo: '[data-part=seg-same]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=trace][data-mode=repeated]', state: 'visible' } },
  { assert: { selector: '[data-part=skipped]', state: 'visible' } },
  { wait: 800 },
]);
