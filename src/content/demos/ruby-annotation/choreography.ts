import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 500 },
  { assert: { selector: '[data-part=sentence][data-mode=mono]', state: 'visible' } },
  { assert: { selector: '[data-part=run][data-annotated]', state: 'visible' } },
  { moveTo: '[data-part=read]' },
  { wait: 900 },
  { assert: { selector: '[data-part=read]', state: 'visible' } },
  // Absolute picks, never a flip: each segment names the setting it reaches, and the
  // pass returns to an annotated state, which is what the subject's data-pose calls honest.
  { moveTo: '[data-part=seg-group]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=sentence][data-mode=group]', state: 'visible' } },
  { assert: { selector: '[data-part=run][data-annotated]', state: 'visible' } },
  { moveTo: '[data-part=seg-off]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=sentence][data-mode=off]', state: 'visible' } },
  { assert: { selector: '[data-part=run][data-annotated]', state: 'hidden' } },
  { moveTo: '[data-part=seg-fallback]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=sentence][data-mode=fallback]', state: 'visible' } },
  { assert: { selector: '[data-part=run][data-annotated]', state: 'visible' } },
  { moveTo: '[data-part=caption]' },
  { wait: 900 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { moveTo: '[data-part=seg-mono]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=sentence][data-mode=mono]', state: 'visible' } },
  { assert: { selector: '[data-part=run][data-annotated]', state: 'visible' } },
  { wait: 700 },
]);
