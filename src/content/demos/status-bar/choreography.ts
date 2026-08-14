import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=strip]', state: 'visible' } },
  // Dark chrome, so the system draws the clock and the glyphs in white.
  { assert: { selector: '[data-part=chrome][data-tint=dark]', state: 'visible' } },
  { assert: { selector: '[data-part=strip][data-ink=light]', state: 'visible' } },
  { assert: { selector: '[data-part=time]', state: 'visible' } },
  { assert: { selector: '[data-part=glyphs]', state: 'visible' } },
  { assert: { selector: '[data-part=content][data-scrolled]', state: 'hidden' } },
  { wait: 700 },
  { moveTo: '[data-part=content]' },
  { scroll: { y: 110 } },
  { wait: 700 },
  // The app's list moved and the strip did not: it is not the app's to scroll.
  { assert: { selector: '[data-part=content][data-scrolled]', state: 'visible' } },
  { assert: { selector: '[data-part=strip]', state: 'visible' } },
  { assert: { selector: '[data-part=time]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=seg-light]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=seg-light][aria-selected="true"]', state: 'visible' } },
  // A light header, and the same strip flips its ink to stay readable.
  { assert: { selector: '[data-part=chrome][data-tint=light]', state: 'visible' } },
  { assert: { selector: '[data-part=strip][data-ink=dark]', state: 'visible' } },
  { assert: { selector: '[data-part=glyphs]', state: 'visible' } },
  { wait: 1200 },
  // Each segment names a tint, so the way back is a tint too, not an undo.
  { moveTo: '[data-part=seg-dark]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=strip][data-ink=light]', state: 'visible' } },
  { assert: { selector: '[data-part=strip]', state: 'visible' } },
  { wait: 800 },
]);
