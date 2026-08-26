import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=waterfall]', state: 'visible' } },
  // Every span on one axis at once: the root spanning the width, the children under it.
  { assert: { selector: '[data-part=bar-root]', state: 'visible' } },
  { assert: { selector: '[data-part=bar-auth]', state: 'visible' } },
  { assert: { selector: '[data-part=bar-inv]', state: 'visible' } },
  { assert: { selector: '[data-part=bar-db]', state: 'visible' } },
  // The stretch with no bar in it at all, which is a finding of its own.
  { assert: { selector: '[data-part=gap]', state: 'visible' } },
  { assert: { selector: '[data-part=detail][data-span=root]', state: 'visible' } },
  { wait: 500 },
  { moveTo: '[data-part=bar-inv]' },
  { click: true },
  { wait: 600 },
  // The bar that is too long, named: the detail panel now reads that span.
  { assert: { selector: '[data-part=detail][data-span=inv]', state: 'visible' } },
  { assert: { selector: '[data-part=row-inv][data-selected]', state: 'visible' } },
  // The panel held its height from mount, so the waterfall above it did not move.
  { assert: { selector: '[data-part=bar-db]', state: 'visible' } },
  { assert: { selector: '[data-part=gap]', state: 'visible' } },
  { wait: 1400 },
]);
