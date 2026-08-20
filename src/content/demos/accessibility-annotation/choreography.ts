import { steps } from '#src/stage/choreography.ts';

/**
 * The comp as it arrives, then the same comp with its semantics written down. Each segment reaches
 * an absolute state rather than toggling one (SPEC §8), and the wait before the notes are claimed is
 * load-bearing: it is the beat a summon polls to bring the subject on stage (SPEC §6).
 */
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=placeholder]', state: 'visible' } },
  { assert: { selector: '[data-part=notes]', state: 'hidden' } },
  { assert: { selector: '[data-part=pin-1]', state: 'hidden' } },
  { wait: 900 },

  { moveTo: '[data-part=seg-annotated]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=notes]', state: 'visible' } },
  { assert: { selector: '[data-part=note-3]', state: 'visible' } },
  { assert: { selector: '[data-part=placeholder]', state: 'hidden' } },
  { assert: { selector: '[data-part=pin-4]', state: 'visible' } },
  { assert: { selector: '[data-part=caption][data-mode=annotated]', state: 'visible' } },
  { wait: 2600 },

  { moveTo: '[data-part=seg-bare]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=notes]', state: 'hidden' } },
  { assert: { selector: '[data-part=placeholder]', state: 'visible' } },
  { assert: { selector: '[data-part=caption][data-mode=bare]', state: 'visible' } },
  { wait: 900 },
]);
