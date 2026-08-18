import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 500 },
  { assert: { selector: '[data-part=article][data-mode=with]', state: 'visible' } },
  { assert: { selector: '[data-part=deck]', state: 'visible' } },
  { moveTo: '[data-part=deck]' },
  { wait: 900 },
  { assert: { selector: '[data-part=headline]', state: 'visible' } },
  // Absolute picks, never a flip: each segment names the stack it reaches.
  { moveTo: '[data-part=seg-without]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=article][data-mode=without]', state: 'visible' } },
  { assert: { selector: '[data-part=deck]', state: 'hidden' } },
  { assert: { selector: '[data-part=byline]', state: 'visible' } },
  { moveTo: '[data-part=caption]' },
  { wait: 1000 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { moveTo: '[data-part=seg-with]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=article][data-mode=with]', state: 'visible' } },
  { assert: { selector: '[data-part=deck]', state: 'visible' } },
  { wait: 800 },
]);
