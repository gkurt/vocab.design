import { steps } from '#src/stage/choreography.ts';

/**
 * The same button read twice: the tree its markup describes, then the tree the browser
 * actually built. Each segment reaches an absolute view rather than toggling one (SPEC §8),
 * and the node tally is claimed only after the collapse has finished, since that readout is
 * the tally of a finished collapse.
 */
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=tree][data-mode=authored]', state: 'visible' } },
  { assert: { selector: '[data-part=nodes][data-mode=authored]', state: 'visible' } },
  { assert: { selector: '[data-part=name]', state: 'visible' } },
  { wait: 700 },

  { moveTo: '[data-part=seg-computed]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=tree][data-mode=computed]', state: 'visible' } },
  { assert: { selector: '[data-part=nodes][data-mode=computed]', state: 'visible' } },
  { assert: { selector: '[data-part=caption][data-mode=computed]', state: 'visible' } },
  { assert: { selector: '[data-part=name]', state: 'visible' } },
  { wait: 1700 },

  { moveTo: '[data-part=seg-authored]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=tree][data-mode=authored]', state: 'visible' } },
  { assert: { selector: '[data-part=nodes][data-mode=authored]', state: 'visible' } },
  { assert: { selector: '[data-part=caption][data-mode=authored]', state: 'visible' } },
  { wait: 1000 },
]);
