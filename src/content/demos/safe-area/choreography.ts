import { steps } from '#src/stage/choreography.ts';

export default steps([
  // At rest the content sits inside the insets, clear of both bands.
  { assert: { selector: '[data-part=region][data-mode=safe]', state: 'visible' } },
  { assert: { selector: '[data-part=warning]', state: 'hidden' } },
  { assert: { selector: '[data-part=cta]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=seg-edge]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=seg-edge][aria-selected="true"]', state: 'visible' } },
  // Ignoring the insets: the title is under the housing, the button under the indicator.
  { assert: { selector: '[data-part=region][data-mode=edge]', state: 'visible' } },
  { assert: { selector: '[data-part=warning]', state: 'visible' } },
  { wait: 1600 },
  // Each segment names a layout, so the way back is a layout too, not an undo.
  { moveTo: '[data-part=seg-safe]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=region][data-mode=safe]', state: 'visible' } },
  { assert: { selector: '[data-part=warning]', state: 'hidden' } },
  { assert: { selector: '[data-part=title]', state: 'visible' } },
  { wait: 800 },
]);
