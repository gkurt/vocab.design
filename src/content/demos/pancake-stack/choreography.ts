import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Short content: the middle row took the slack, so the footer is on the bottom edge.
  { assert: { selector: '[data-part=page][data-length=short]', state: 'visible' } },
  { assert: { selector: '[data-part=block-0]', state: 'visible' } },
  { assert: { selector: '[data-part=block-3]', state: 'hidden' } },
  { assert: { selector: '[data-part=footer]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=seg-long]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=seg-long][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=page][data-length=long]', state: 'visible' } },
  { assert: { selector: '[data-part=block-3]', state: 'visible' } },
  { wait: 600 },
  // The same three rows, now taller than the window: the footer is found by scrolling.
  { moveTo: '[data-part=viewport]' },
  { scroll: { y: 220 } },
  { wait: 700 },
  { assert: { selector: '[data-part=footer]', state: 'visible' } },
  { wait: 900 },
  // Each segment names a content length, so the way back is a length too.
  { moveTo: '[data-part=seg-short]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=page][data-length=short]', state: 'visible' } },
  { assert: { selector: '[data-part=block-3]', state: 'hidden' } },
  { assert: { selector: '[data-part=footer]', state: 'visible' } },
  { wait: 700 },
]);
