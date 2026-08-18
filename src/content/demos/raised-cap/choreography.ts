import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 500 },
  { assert: { selector: '[data-part=cap][data-mode=raised]', state: 'visible' } },
  { assert: { selector: '[data-part=cap][data-raised]', state: 'visible' } },
  { assert: { selector: '[data-part=guide]', state: 'visible' } },
  // Absolute picks, never a flip: each segment names the setting it reaches, and the
  // pass returns to the raised setting, which is what the subject's data-pose calls honest.
  { moveTo: '[data-part=seg-none]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=cap][data-mode=none]', state: 'visible' } },
  { assert: { selector: '[data-part=cap][data-raised]', state: 'hidden' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { moveTo: '[data-part=seg-drop]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=cap][data-mode=drop]', state: 'visible' } },
  { moveTo: '[data-part=opening]' },
  { wait: 900 },
  { assert: { selector: '[data-part=opening]', state: 'visible' } },
  { moveTo: '[data-part=seg-raised]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=cap][data-mode=raised]', state: 'visible' } },
  { assert: { selector: '[data-part=cap][data-raised]', state: 'visible' } },
  { wait: 700 },
]);
