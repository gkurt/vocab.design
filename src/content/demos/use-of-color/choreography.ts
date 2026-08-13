import { steps } from '#src/stage/choreography.ts';

/**
 * The marks, then the same screen with only hue left, then the marks back. Each segment
 * reaches its own state, so a pass joined halfway proves the same thing (SPEC §8).
 */
export default steps([
  { assert: { selector: '[data-part=example][data-mode=redundant]', state: 'visible' } },
  { assert: { selector: '[data-part=star]', state: 'visible' } },
  { assert: { selector: '[data-part=link][data-cue=underline]', state: 'visible' } },
  { assert: { selector: '[data-part=series-labels]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=seg-hue]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=example][data-mode=hue]', state: 'visible' } },
  { assert: { selector: '[data-part=star]', state: 'hidden' } },
  { assert: { selector: '[data-part=required-word]', state: 'hidden' } },
  { assert: { selector: '[data-part=series-labels]', state: 'hidden' } },
  { assert: { selector: '[data-part=link][data-cue=hue]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-state=hue]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-redundant]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=example][data-mode=redundant]', state: 'visible' } },
  { assert: { selector: '[data-part=series-labels]', state: 'visible' } },
  { wait: 900 },
]);
