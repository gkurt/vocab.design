import { steps } from '#src/stage/choreography.ts';

/**
 * The specimen rests on an authored role description, so the script goes to what the platform
 * would have said, then to the same attribute used to lie, then back. Each segment reaches an
 * absolute state rather than toggling one (SPEC §8), and every claim waits for the voice.
 */
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=role][data-source=honest]', state: 'visible' } },
  { assert: { selector: '[data-part=utterance][data-state=spoken]', state: 'visible' } },
  { wait: 900 },

  { moveTo: '[data-part=seg-stock]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=role][data-source=stock]', state: 'visible' } },
  { assert: { selector: '[data-part=caption][data-source=stock]', state: 'visible' } },
  { wait: 1500 },

  { moveTo: '[data-part=seg-lying]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=role][data-source=lying]', state: 'visible' } },
  { assert: { selector: '[data-part=reel][data-source=lying]', state: 'visible' } },
  { assert: { selector: '[data-part=caption][data-source=lying]', state: 'visible' } },
  { wait: 1800 },

  { moveTo: '[data-part=seg-honest]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=role][data-source=honest]', state: 'visible' } },
  { assert: { selector: '[data-part=utterance][data-state=spoken]', state: 'visible' } },
  { wait: 1000 },
]);
