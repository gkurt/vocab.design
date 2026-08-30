import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 500 },
  { assert: { selector: '[data-part=column][data-mode=default]', state: 'visible' } },
  { assert: { selector: '[data-part=column][data-laddered]', state: 'visible' } },
  { moveTo: '[data-part=rungs]' },
  { wait: 900 },
  { assert: { selector: '[data-part=rungs]', state: 'visible' } },
  // Absolute picks, never a flip: each segment names the setting it reaches, and the
  // pass returns to the laddered state, which is what the subject's data-pose calls honest.
  { moveTo: '[data-part=seg-limited]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=column][data-mode=limited]', state: 'visible' } },
  { assert: { selector: '[data-part=column][data-laddered]', state: 'hidden' } },
  { assert: { selector: '[data-part=note]', state: 'visible' } },
  { moveTo: '[data-part=rungs]' },
  { wait: 1100 },
  { moveTo: '[data-part=seg-default]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=column][data-mode=default]', state: 'visible' } },
  { assert: { selector: '[data-part=column][data-laddered]', state: 'visible' } },
  { wait: 800 },
]);
