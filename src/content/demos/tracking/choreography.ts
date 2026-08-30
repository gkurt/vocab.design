import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 450 },
  { assert: { selector: '[data-part=eyebrow][data-track=set]', state: 'visible' } },
  { assert: { selector: '[data-part=headline]', state: 'visible' } },
  { assert: { selector: '[data-part=value-eyebrow]', state: 'visible' } },
  { wait: 900 },
  // Absolute settings, never a flip: each segment names the state it reaches, so a
  // pass joined halfway still lands on a stated setting (SPEC §8).
  { moveTo: '[data-part=seg-typed]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=eyebrow][data-track=typed]', state: 'visible' } },
  { assert: { selector: '[data-part=eyebrow][data-track=set]', state: 'hidden' } },
  { assert: { selector: '[data-part=headline][data-track=typed]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-set]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=eyebrow][data-track=set]', state: 'visible' } },
  { assert: { selector: '[data-part=headline][data-track=set]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=px-eyebrow]', state: 'visible' } },
  { assert: { selector: '[data-part=px-headline]', state: 'visible' } },
]);
