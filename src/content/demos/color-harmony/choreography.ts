import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The set is lifted out of the wheel from mount, so the pose already shows a rule being applied.
  { assert: { selector: '[data-part=set][data-rule="complementary"]', state: 'visible' } },
  { assert: { selector: '[data-part=strip]', state: 'visible' } },
  { wait: 900 },
  // Every segment names one rule outright, so a pass resumed anywhere reaches the same state.
  { moveTo: '[data-part=seg-analogous]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=set][data-rule="analogous"]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-triadic]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=set][data-rule="triadic"]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-split]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=set][data-rule="split"]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-complementary]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=set][data-rule="complementary"]', state: 'visible' } },
  { wait: 900 },
]);
