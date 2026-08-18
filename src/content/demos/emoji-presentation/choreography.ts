import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 500 },
  { assert: { selector: '[data-part=mark][data-mode=text]', state: 'visible' } },
  { assert: { selector: '[data-part=spellings]', state: 'visible' } },
  { moveTo: '[data-part=cell-emoji]' },
  { wait: 900 },
  { assert: { selector: '[data-part=cell-emoji]', state: 'visible' } },
  // Absolute picks, never a flip: each segment names the setting it reaches.
  { moveTo: '[data-part=seg-emoji]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=mark][data-mode=emoji]', state: 'visible' } },
  { assert: { selector: '[data-part=cell-text]', state: 'visible' } },
  { moveTo: '[data-part=seg-auto]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=mark][data-mode=auto]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { moveTo: '[data-part=caption]' },
  { wait: 900 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { moveTo: '[data-part=seg-text]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=mark][data-mode=text]', state: 'visible' } },
  { wait: 700 },
]);
