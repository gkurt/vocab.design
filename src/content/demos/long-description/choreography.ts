import { steps } from '#src/stage/choreography.ts';

/**
 * Alt on its own, then the same figure with a description declared and opened. Each segment
 * reaches an absolute state rather than toggling one, and the panel has an explicit open and an
 * explicit dismissal (SPEC §8). The wait before the panel is claimed is load-bearing: it is the
 * beat a summon polls to bring the subject on stage (SPEC §6).
 */
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=utterance][data-mode=alt]', state: 'visible' } },
  { assert: { selector: '[data-part=reveal]', state: 'hidden' } },
  { assert: { selector: '[data-part=description]', state: 'hidden' } },
  { wait: 800 },

  { moveTo: '[data-part=seg-details]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=utterance][data-mode=details]', state: 'visible' } },
  { assert: { selector: '[data-part=reveal]', state: 'visible' } },
  { assert: { selector: '[data-part=description]', state: 'hidden' } },
  { wait: 600 },

  { moveTo: '[data-part=reveal]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=description]', state: 'visible' } },
  { assert: { selector: '[data-part=status]', state: 'hidden' } },
  { assert: { selector: '[data-part=verdict][data-mode=details]', state: 'visible' } },
  { wait: 2200 },

  { moveTo: '[data-part=hide]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=description]', state: 'hidden' } },
  { assert: { selector: '[data-part=status][data-mode=details]', state: 'visible' } },
  { wait: 700 },

  { moveTo: '[data-part=seg-alt]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=utterance][data-mode=alt]', state: 'visible' } },
  { assert: { selector: '[data-part=status][data-mode=alt]', state: 'visible' } },
  { assert: { selector: '[data-part=reveal]', state: 'hidden' } },
  { wait: 900 },
]);
