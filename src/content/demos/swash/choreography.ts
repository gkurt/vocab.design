import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 500 },
  { assert: { selector: '[data-part=line][data-mode=initial]', state: 'visible' } },
  { assert: { selector: '[data-part=line][data-swashed]', state: 'visible' } },
  { moveTo: '[data-part=detail]' },
  { wait: 900 },
  { assert: { selector: '[data-part=glyph-detail]', state: 'visible' } },
  // Absolute picks, never a flip: each segment names the setting it reaches, and the
  // pass returns to a swashed state, which is what the subject's data-pose calls honest.
  { moveTo: '[data-part=seg-off]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=line][data-mode=off]', state: 'visible' } },
  { assert: { selector: '[data-part=line][data-swashed]', state: 'hidden' } },
  { assert: { selector: '[data-part=read]', state: 'visible' } },
  { moveTo: '[data-part=seg-every]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=line][data-mode=every]', state: 'visible' } },
  { assert: { selector: '[data-part=line][data-swashed]', state: 'visible' } },
  { moveTo: '[data-part=caption]' },
  { wait: 1000 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { moveTo: '[data-part=seg-initial]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=line][data-mode=initial]', state: 'visible' } },
  { assert: { selector: '[data-part=line][data-swashed]', state: 'visible' } },
  { wait: 800 },
]);
