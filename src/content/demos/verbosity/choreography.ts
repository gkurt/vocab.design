import { steps } from '#src/stage/choreography.ts';

/**
 * The same control read three ways. Each segment reaches its own absolute level rather than
 * toggling one (SPEC §8), so a pass joined halfway proves the same thing. Every claim is made
 * after the reader has finished speaking, since the utterance is the thing under test.
 */
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=utterance][data-level=low]', state: 'visible' } },
  { assert: { selector: '[data-part=utterance][data-state=spoken]', state: 'visible' } },
  { wait: 900 },

  { moveTo: '[data-part=seg-medium]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=utterance][data-level=medium]', state: 'visible' } },
  { assert: { selector: '[data-part=utterance][data-state=spoken]', state: 'visible' } },
  { assert: { selector: '[data-part=caption][data-level=medium]', state: 'visible' } },
  { wait: 1400 },

  { moveTo: '[data-part=seg-high]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=utterance][data-level=high]', state: 'visible' } },
  { assert: { selector: '[data-part=utterance][data-state=spoken]', state: 'visible' } },
  { wait: 1600 },

  { moveTo: '[data-part=seg-low]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=utterance][data-level=low]', state: 'visible' } },
  { assert: { selector: '[data-part=caption][data-level=low]', state: 'visible' } },
  { wait: 1000 },
]);
