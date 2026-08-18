import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for them to land.
  { wait: 420 },
  { assert: { selector: '[data-part=card-brand][data-technique=opacity]', state: 'visible' } },
  // One ink at three alphas: fine on white, and the middle rung already short on the brand surface.
  { assert: { selector: '[data-part=row-white-medium][data-verdict=pass]', state: 'visible' } },
  { assert: { selector: '[data-part=row-brand-high][data-verdict=pass]', state: 'visible' } },
  { assert: { selector: '[data-part=row-brand-medium][data-verdict=fail]', state: 'visible' } },
  { assert: { selector: '[data-part=ratio-brand-medium]', state: 'visible' } },
  { wait: 1600 },
  // Each segment names one technique outright, so a pass picked up anywhere lands the same.
  { moveTo: '[data-part=seg-tokens]' },
  { click: true },
  { wait: 650 },
  { assert: { selector: '[data-part=card-brand][data-technique=tokens]', state: 'visible' } },
  // Named on-surface colours, chosen for this surface: the same rung now clears AA.
  { assert: { selector: '[data-part=row-brand-medium][data-verdict=pass]', state: 'visible' } },
  { assert: { selector: '[data-part=row-white-medium][data-verdict=pass]', state: 'visible' } },
  // Disabled is exempt from the requirement under both techniques, not failed by either.
  { assert: { selector: '[data-part=row-brand-disabled][data-verdict=exempt]', state: 'visible' } },
  { wait: 1800 },
  { moveTo: '[data-part=seg-opacity]' },
  { click: true },
  { wait: 650 },
  { assert: { selector: '[data-part=card-brand][data-technique=opacity]', state: 'visible' } },
  { assert: { selector: '[data-part=row-brand-medium][data-verdict=fail]', state: 'visible' } },
  { wait: 900 },
]);
