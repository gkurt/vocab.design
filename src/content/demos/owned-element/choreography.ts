import { steps } from '#src/stage/choreography.ts';

/**
 * The same markup read twice: the tree with the options adopted, then the tree without. Each
 * segment reaches an absolute state rather than toggling one (SPEC §8), and every claim is given
 * room after the cross-fade rather than judged at its edge.
 */
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=adopted]', state: 'visible' } },
  { assert: { selector: '[data-part=attr]', state: 'visible' } },
  { assert: { selector: '[data-part=note][data-mode=owned]', state: 'visible' } },
  { assert: { selector: '[data-part=orphans]', state: 'hidden' } },
  { wait: 800 },

  { moveTo: '[data-part=seg-unowned]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=adopted]', state: 'hidden' } },
  { assert: { selector: '[data-part=orphans]', state: 'visible' } },
  { assert: { selector: '[data-part=attr]', state: 'hidden' } },
  { assert: { selector: '[data-part=note][data-mode=unowned]', state: 'visible' } },
  { assert: { selector: '[data-part=caption][data-mode=unowned]', state: 'visible' } },
  { wait: 2000 },

  { moveTo: '[data-part=seg-owned]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=adopted]', state: 'visible' } },
  { assert: { selector: '[data-part=orphans]', state: 'hidden' } },
  { assert: { selector: '[data-part=caption][data-mode=owned]', state: 'visible' } },
  { wait: 900 },
]);
