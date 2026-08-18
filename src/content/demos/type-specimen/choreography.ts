import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 500 },
  { assert: { selector: '[data-part=sheet][data-face=serif]', state: 'visible' } },
  { assert: { selector: '[data-part=display]', state: 'visible' } },
  { moveTo: '[data-part=prose]' },
  { wait: 700 },
  { assert: { selector: '[data-part=charset]', state: 'visible' } },
  // Absolute picks, never a flip: each segment names the face it reaches.
  { moveTo: '[data-part=seg-mono]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=sheet][data-face=mono]', state: 'visible' } },
  { assert: { selector: '[data-part=weights]', state: 'visible' } },
  { moveTo: '[data-part=seg-sans]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=sheet][data-face=sans]', state: 'visible' } },
  { moveTo: '[data-part=seg-serif]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=sheet][data-face=serif]', state: 'visible' } },
  { assert: { selector: '[data-part=prose]', state: 'visible' } },
  { wait: 700 },
]);
