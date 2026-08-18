import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 500 },
  { assert: { selector: '[data-part=pair-av][data-mode=optical]', state: 'visible' } },
  { assert: { selector: '[data-part=gauge-av]', state: 'visible' } },
  { moveTo: '[data-part=gauge-to]' },
  { wait: 800 },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  // Absolute picks, never a flip: each segment names the setting it reaches, and the
  // pass ends optical, which is what the subject's data-pose calls honest.
  { moveTo: '[data-part=seg-none]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=pair-av][data-mode=none]', state: 'visible' } },
  { assert: { selector: '[data-part=pair-av][data-mode=optical]', state: 'hidden' } },
  { assert: { selector: '[data-part=pair-ye][data-mode=none]', state: 'visible' } },
  { moveTo: '[data-part=seg-metric]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=pair-av][data-mode=metric]', state: 'visible' } },
  { assert: { selector: '[data-part=value-to]', state: 'visible' } },
  { moveTo: '[data-part=seg-optical]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=pair-av][data-mode=optical]', state: 'visible' } },
  { assert: { selector: '[data-part=pair-to][data-mode=optical]', state: 'visible' } },
  { wait: 700 },
]);
