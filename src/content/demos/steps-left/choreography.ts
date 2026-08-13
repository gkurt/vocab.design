import { steps } from '#src/stage/choreography.ts';

// The count is read off the indicator itself at every stop, in both directions, so the
// pass proves the remainder was restated rather than that a bar grew (SPEC §8).
export default steps([
  { assert: { selector: '[data-part=meter][data-step="2"]', state: 'visible' } },
  { assert: { selector: '[data-part=left][data-remaining="2"]', state: 'visible' } },
  { assert: { selector: '[data-part=seg-2][data-state="current"]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=continue]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=meter][data-step="3"]', state: 'visible' } },
  { assert: { selector: '[data-part=left][data-remaining="1"]', state: 'visible' } },
  { assert: { selector: '[data-part=seg-2][data-state="done"]', state: 'visible' } },
  { wait: 800 },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=meter][data-step="4"][data-last]', state: 'visible' } },
  { assert: { selector: '[data-part=left][data-remaining="0"]', state: 'visible' } },
  { assert: { selector: '[data-part=seg-4][data-state="current"]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=back]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=meter][data-step="3"]', state: 'visible' } },
  { assert: { selector: '[data-part=left][data-remaining="1"]', state: 'visible' } },
  { wait: 1100 },
]);
