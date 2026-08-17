import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 400 },
  // Mount is Home: the bar carries all four destinations and marks the current one.
  { assert: { selector: '[data-part=global][data-current=home]', state: 'visible' } },
  { assert: { selector: '[data-part=nav-home][data-current]', state: 'visible' } },
  { assert: { selector: '[data-part=nav-settings]', state: 'visible' } },
  { assert: { selector: '[data-part=tab-activity]', state: 'visible' } },
  { wait: 1000 },
  { moveTo: '[data-part=nav-library]' },
  { click: true },
  { wait: 700 },
  // The bar is unchanged: same four destinations, the marker moved. The section links
  // under it are a different list entirely.
  { assert: { selector: '[data-part=global][data-current=library]', state: 'visible' } },
  { assert: { selector: '[data-part=nav-home]', state: 'visible' } },
  { assert: { selector: '[data-part=nav-home][data-current]', state: 'hidden' } },
  { assert: { selector: '[data-part=tab-charts]', state: 'visible' } },
  { assert: { selector: '[data-part=tab-activity]', state: 'hidden' } },
  { wait: 1200 },
  { moveTo: '[data-part=nav-reports]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=global][data-current=reports]', state: 'visible' } },
  { assert: { selector: '[data-part=nav-reports][data-current]', state: 'visible' } },
  { assert: { selector: '[data-part=tab-weekly]', state: 'visible' } },
  { assert: { selector: '[data-part=tab-charts]', state: 'hidden' } },
  { wait: 1200 },
  // Each item names a destination, so the way back is a destination too, not an undo.
  { moveTo: '[data-part=nav-home]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=global][data-current=home]', state: 'visible' } },
  { assert: { selector: '[data-part=nav-settings]', state: 'visible' } },
  { wait: 900 },
]);
