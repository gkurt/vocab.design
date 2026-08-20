import { steps } from '#src/stage/choreography.ts';

/**
 * One instruction read twice: pointing by shape and side, then with the control's name in the
 * sentence. Each segment reaches an absolute state rather than toggling one (SPEC §8), and the claim
 * is the match in the linearized column, which is the only place the two instructions differ. The
 * pass ends back on the sensory state, which is the one the subject's `data-pose` calls honest.
 */
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=instruction][data-mode=sensory]', state: 'visible' } },
  { assert: { selector: '[data-part=drawn]', state: 'visible' } },
  { assert: { selector: '[data-part=name-2][data-matched]', state: 'hidden' } },
  { wait: 1100 },

  { moveTo: '[data-part=seg-named]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=instruction][data-mode=named]', state: 'visible' } },
  { assert: { selector: '[data-part=name-2][data-matched]', state: 'visible' } },
  { assert: { selector: '[data-part=verdict][data-mode=named]', state: 'visible' } },
  { wait: 2200 },

  { moveTo: '[data-part=seg-sensory]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=instruction][data-mode=sensory]', state: 'visible' } },
  { assert: { selector: '[data-part=name-2][data-matched]', state: 'hidden' } },
  { assert: { selector: '[data-part=verdict][data-mode=sensory]', state: 'visible' } },
  { wait: 1000 },
]);
