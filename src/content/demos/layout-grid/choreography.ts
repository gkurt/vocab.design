import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=overlay]', state: 'visible' } },
  { assert: { selector: '[data-part=layout][data-arrangement=article]', state: 'visible' } },
  { assert: { selector: '[data-part=block-main][data-span="8"]', state: 'visible' } },
  { assert: { selector: '[data-part=block-aside][data-span="4"]', state: 'visible' } },
  { assert: { selector: '[data-part=block-extra]', state: 'hidden' } },
  { moveTo: '[data-part=seg-gallery]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=seg-gallery][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=layout][data-arrangement=gallery]', state: 'visible' } },
  // Thirds this time, on the same twelve columns: 4 and 4 and 4.
  { assert: { selector: '[data-part=block-main][data-span="4"]', state: 'visible' } },
  { assert: { selector: '[data-part=block-extra][data-span="4"]', state: 'visible' } },
  // The masthead still spans the lot, and the grid it spans has not moved.
  { assert: { selector: '[data-part=block-head]', state: 'visible' } },
  { assert: { selector: '[data-part=overlay]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-article]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=layout][data-arrangement=article]', state: 'visible' } },
  { assert: { selector: '[data-part=block-main][data-span="8"]', state: 'visible' } },
  { assert: { selector: '[data-part=block-extra]', state: 'hidden' } },
  { wait: 800 },
]);
