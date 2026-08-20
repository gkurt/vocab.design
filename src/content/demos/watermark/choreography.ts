import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the resting claims wait for the sheet to land.
  { wait: 700 },
  { assert: { selector: '[data-part=mark][data-weight=light]', state: 'visible' } },
  { assert: { selector: '[data-part=note][data-state=light]', state: 'visible' } },
  { wait: 600 },

  // The page with nothing claiming it: the mark is the only thing that changed.
  { moveTo: '[data-part=seg-clean]' },
  { click: true },
  { wait: 550 },
  { assert: { selector: '[data-part=mark]', state: 'hidden' } },
  { assert: { selector: '[data-part=note][data-state=clean]', state: 'visible' } },
  { assert: { selector: '[data-part=sheet]', state: 'visible' } },
  { wait: 900 },

  // The craft failure: dense enough that no screenshot escapes it, and dense enough
  // that the text underneath stops being readable.
  { moveTo: '[data-part=seg-heavy]' },
  { click: true },
  { wait: 550 },
  { assert: { selector: '[data-part=mark][data-weight=heavy]', state: 'visible' } },
  { assert: { selector: '[data-part=note][data-state=heavy]', state: 'visible' } },
  { wait: 1100 },

  // Back to the setting that works: faint, tiled and turned across the whole page.
  { moveTo: '[data-part=seg-light]' },
  { click: true },
  { wait: 550 },
  { assert: { selector: '[data-part=mark][data-weight=light]', state: 'visible' } },
  { assert: { selector: '[data-part=note][data-state=light]', state: 'visible' } },
  { wait: 800 },
]);
