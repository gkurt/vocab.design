import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=strip][data-hue="265"]', state: 'visible' } },
  { moveTo: '[data-part=stop-25]' },
  { click: true },
  // Each stop is an absolute angle, so a pass that starts anywhere lands in the same place.
  { assert: { selector: '[data-part=strip][data-hue="25"]', state: 'visible' } },
  { assert: { selector: '[data-part=stop-25][data-selected]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=stop-140]' },
  { click: true },
  { assert: { selector: '[data-part=strip][data-hue="140"]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=stop-265]' },
  { click: true },
  { assert: { selector: '[data-part=strip][data-hue="265"]', state: 'visible' } },
  { wait: 1200 },
]);
