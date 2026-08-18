import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 500 },
  { assert: { selector: '[data-part=headline][data-mode=tuned]', state: 'visible' } },
  { assert: { selector: '[data-part=headline][data-tuned]', state: 'visible' } },
  { moveTo: '[data-part=shift]' },
  { wait: 900 },
  { assert: { selector: '[data-part=shift]', state: 'visible' } },
  // Absolute picks, never a flip: each segment names the family it reaches, and the
  // pass returns to the tuned state, which is what the subject's data-pose calls honest.
  { moveTo: '[data-part=seg-fallback]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=headline][data-mode=fallback]', state: 'visible' } },
  { assert: { selector: '[data-part=headline][data-tuned]', state: 'hidden' } },
  { assert: { selector: '[data-part=declaration]', state: 'visible' } },
  { moveTo: '[data-part=seg-web]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=headline][data-mode=web]', state: 'visible' } },
  { moveTo: '[data-part=caption]' },
  { wait: 1000 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { moveTo: '[data-part=seg-tuned]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=headline][data-mode=tuned]', state: 'visible' } },
  { assert: { selector: '[data-part=headline][data-tuned]', state: 'visible' } },
  { wait: 800 },
]);
