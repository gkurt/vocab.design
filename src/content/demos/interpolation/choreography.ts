import { steps } from '#src/stage/choreography.ts';

// The run plays once at mount, so the script opens after it has landed rather than judging the
// card mid-blend. Each segment names an animation type and Replay names a run, so neither step
// flips whatever it finds (SPEC §8).
export default steps([
  { wait: 2000 },
  { assert: { selector: '[data-part=scene][data-state=rested]', state: 'visible' } },
  { assert: { selector: '[data-part=card]', state: 'visible' } },
  { assert: { selector: '[data-part=track]', state: 'visible' } },

  // The discrete case, and the point of the specimen: a keyword has no halfway.
  { moveTo: '[data-part=seg-keyword]' },
  { click: true },
  // The run lasts 1.6 s, so the post-click beat lands well inside it.
  { assert: { selector: '[data-part=scene][data-mode=keyword][data-state=running]', state: 'visible' } },
  { wait: 2000 },
  { assert: { selector: '[data-part=scene][data-state=rested]', state: 'visible' } },
  // Sample five is the midpoint, and it has already switched; sample four has not.
  { assert: { selector: '[data-part=glyph-5]', state: 'visible' } },
  { assert: { selector: '[data-part=glyph-4]', state: 'visible' } },

  { moveTo: '[data-part=seg-color]' },
  { click: true },
  { assert: { selector: '[data-part=scene][data-mode=color][data-state=running]', state: 'visible' } },
  { wait: 2000 },
  { assert: { selector: '[data-part=scene][data-state=rested]', state: 'visible' } },
  { assert: { selector: '[data-part=tile-5]', state: 'visible' } },

  { moveTo: '[data-part=replay]' },
  { click: true },
  { assert: { selector: '[data-part=scene][data-state=running]', state: 'visible' } },
  { wait: 2000 },
  { assert: { selector: '[data-part=scene][data-state=rested]', state: 'visible' } },

  { moveTo: '[data-part=seg-number]' },
  { click: true },
  { wait: 2000 },
  { assert: { selector: '[data-part=scene][data-mode=number][data-state=rested]', state: 'visible' } },
  { assert: { selector: '[data-part=bar-9]', state: 'visible' } },
  { wait: 700 },
]);
