import { steps } from '#src/stage/choreography.ts';

/**
 * Each segment reaches its own absolute state rather than toggling one (SPEC §8), so a pass
 * joined halfway proves the same thing. The pass ends back on the flat card, which is the
 * mount state and the only state in which the subject is the term.
 */
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=card][data-mode=flat]', state: 'visible' } },
  { assert: { selector: '[data-part=verdict][data-mode=flat]', state: 'visible' } },
  { wait: 900 },

  { moveTo: '[data-part=mode-depth]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=card][data-mode=depth]', state: 'visible' } },
  { assert: { selector: '[data-part=verdict][data-mode=depth]', state: 'visible' } },
  { wait: 1400 },

  { moveTo: '[data-part=mode-flat]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=card][data-mode=flat]', state: 'visible' } },
  { wait: 1000 },
]);
