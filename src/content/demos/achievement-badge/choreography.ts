import { steps } from '#src/stage/choreography.ts';

// The set with its holes, then one hole filled in. Locked and earned are both on screen
// throughout, which is what the greyed markers are for (SPEC §8).
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=medal-weeks][data-state=locked]', state: 'visible' } },
  { assert: { selector: '[data-part=medal-first][data-state=earned]', state: 'visible' } },
  { assert: { selector: '[data-part=count][data-earned="3"]', state: 'visible' } },
  { wait: 900 },

  { moveTo: '[data-part=advance]' },
  { wait: 300 },
  { click: true },
  { wait: 600 },
  // The marker fills in, the count moves, and nothing below it shifts.
  { assert: { selector: '[data-part=medal-weeks][data-state=earned]', state: 'visible' } },
  { assert: { selector: '[data-part=count][data-earned="4"]', state: 'visible' } },
  { assert: { selector: '[data-part=medal-batch][data-state=locked]', state: 'visible' } },
  { wait: 1400 },
]);
