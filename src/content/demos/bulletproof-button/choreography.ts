import { steps } from '#src/stage/choreography.ts';

/**
 * Each segment names a regime outright, so a pass joined halfway is still in a
 * stated state (SPEC §8). The claim is the survivor: the bulletproof button reads
 * the same in both, while the one that leaned on the stylesheet does not.
 */
export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=proof][data-mode=kept]', state: 'visible' } },
  { assert: { selector: '[data-part=naive-link][data-styled=yes]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=seg-dropped]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=proof][data-mode=dropped]', state: 'visible' } },
  { assert: { selector: '[data-part=proof-cell]', state: 'visible' } },
  { assert: { selector: '[data-part=naive-link][data-styled=no]', state: 'visible' } },
  { wait: 1700 },
  { moveTo: '[data-part=seg-kept]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=proof][data-mode=kept]', state: 'visible' } },
  { assert: { selector: '[data-part=naive-link][data-styled=yes]', state: 'visible' } },
  { wait: 900 },
]);
