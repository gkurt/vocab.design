import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 500 },
  { assert: { selector: '[data-part=joint][data-trapped]', state: 'visible' } },
  { assert: { selector: '[data-part=gained]', state: 'visible' } },
  { moveTo: '[data-part=gained]' },
  { wait: 900 },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  // Absolute picks, never a flip: each segment names the setting it reaches, and the
  // pass returns to the trapped setting, which is what the subject's data-pose calls honest.
  { moveTo: '[data-part=seg-plain]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=joint][data-mode=plain]', state: 'visible' } },
  { assert: { selector: '[data-part=joint][data-trapped]', state: 'hidden' } },
  { moveTo: '[data-part=whole]' },
  { wait: 900 },
  { assert: { selector: '[data-part=whole]', state: 'visible' } },
  { moveTo: '[data-part=seg-trap]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=joint][data-mode=trap]', state: 'visible' } },
  { assert: { selector: '[data-part=joint][data-trapped]', state: 'visible' } },
  { wait: 700 },
]);
