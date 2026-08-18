import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 700 },
  // Mount: left to right, where inline-start resolves to the left edge.
  { assert: { selector: '[data-part=card][data-mode=ltr]', state: 'visible' } },
  { assert: { selector: '[data-part=resolved-0]', state: 'visible' } },
  { assert: { selector: '[data-part=badge]', state: 'visible' } },
  { wait: 1000 },
  // Right to left: the same declaration, now landing on the right edge.
  { moveTo: '[data-part=seg-rtl]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=card][data-mode=rtl]', state: 'visible' } },
  { assert: { selector: '[data-part=lead]', state: 'visible' } },
  { wait: 1300 },
  // Vertical writing: the inline axis turns, and inline-start becomes the top edge.
  { moveTo: '[data-part=seg-vertical]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=card][data-mode=vertical]', state: 'visible' } },
  { assert: { selector: '[data-part=title]', state: 'visible' } },
  { assert: { selector: '[data-part=mode-css]', state: 'visible' } },
  { wait: 1300 },
  // Back to left to right.
  { moveTo: '[data-part=seg-ltr]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=card][data-mode=ltr]', state: 'visible' } },
  { wait: 800 },
]);
