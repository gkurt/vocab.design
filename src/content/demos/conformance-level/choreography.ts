import { steps } from '#src/stage/choreography.ts';

/**
 * Drop the claim to A and the AA rows fall out of scope; raise it to AAA and a criterion
 * nobody was failing before starts counting against the claim. The tally is read from the
 * rows each time. Each segment reaches its own target, so a pass joined halfway proves the
 * same thing (SPEC §8), and the criterion levels themselves never move.
 */
export default steps([
  { wait: 400 },
  { assert: { selector: '[data-part=list][data-target=aa]', state: 'visible' } },
  { assert: { selector: '[data-part=count][data-score="3-of-4"]', state: 'visible' } },
  { assert: { selector: '[data-part=row-contrast][data-scope=required]', state: 'visible' } },
  { assert: { selector: '[data-part=row-enhanced][data-scope=extra]', state: 'visible' } },
  { assert: { selector: '[data-part=tag-contrast][data-level=aa]', state: 'visible' } },
  { wait: 900 },

  { moveTo: '[data-part=seg-a]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=list][data-target=a]', state: 'visible' } },
  { assert: { selector: '[data-part=count][data-score="2-of-2"]', state: 'visible' } },
  { assert: { selector: '[data-part=row-nontext][data-scope=required]', state: 'visible' } },
  { assert: { selector: '[data-part=row-contrast][data-scope=extra]', state: 'visible' } },
  { assert: { selector: '[data-part=tag-contrast][data-level=aa]', state: 'visible' } },
  { wait: 1300 },

  { moveTo: '[data-part=seg-aaa]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=list][data-target=aaa]', state: 'visible' } },
  { assert: { selector: '[data-part=count][data-score="3-of-5"]', state: 'visible' } },
  { assert: { selector: '[data-part=row-enhanced][data-scope=required]', state: 'visible' } },
  { assert: { selector: '[data-part=caption][data-target=aaa]', state: 'visible' } },
  { wait: 1300 },

  { moveTo: '[data-part=seg-aa]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=count][data-score="3-of-4"]', state: 'visible' } },
  { assert: { selector: '[data-part=row-enhanced][data-scope=extra]', state: 'visible' } },
  { wait: 900 },
]);
