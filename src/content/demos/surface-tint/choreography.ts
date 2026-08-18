import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for them to land.
  { wait: 420 },
  { assert: { selector: '[data-part=card-dark-l5][data-mode=tonal][data-tint="14"]', state: 'visible' } },
  { assert: { selector: '[data-part=card-dark-l1][data-tint="5"]', state: 'visible' } },
  { assert: { selector: '[data-part=card-light-l5][data-tint="14"]', state: 'visible' } },
  { wait: 1400 },
  // Each segment names one mode outright, so a pass picked up anywhere lands the same.
  { moveTo: '[data-part=seg-shadow]' },
  { click: true },
  { wait: 600 },
  // Shadow alone: the tint drops to zero on every level, on both schemes.
  { assert: { selector: '[data-part=card-dark-l5][data-mode=shadow][data-tint="0"]', state: 'visible' } },
  { assert: { selector: '[data-part=card-light-l5][data-mode=shadow][data-tint="0"]', state: 'visible' } },
  { wait: 1700 },
  { moveTo: '[data-part=seg-both]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=card-dark-l5][data-mode=both][data-tint="14"]', state: 'visible' } },
  { assert: { selector: '[data-part=card-dark-l3][data-mode=both][data-tint="11"]', state: 'visible' } },
  { wait: 1600 },
  { moveTo: '[data-part=seg-tonal]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=card-dark-l5][data-mode=tonal][data-tint="14"]', state: 'visible' } },
  { assert: { selector: '[data-part=card-dark-l0][data-tint="0"]', state: 'visible' } },
  { wait: 900 },
]);
