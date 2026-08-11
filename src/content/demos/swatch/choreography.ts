import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=sample][data-swatch="sky"]', state: 'visible' } },
  { assert: { selector: '[data-part=sw-sky][aria-selected="true"]', state: 'visible' } },
  { moveTo: '[data-part=sw-ember]' },
  { click: true },
  // Each sample is an absolute choice, so the applied value is the same wherever a pass began.
  { assert: { selector: '[data-part=sample][data-swatch="ember"]', state: 'visible' } },
  { assert: { selector: '[data-part=sw-ember][aria-selected="true"]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=sw-moss]' },
  { click: true },
  { assert: { selector: '[data-part=sample][data-swatch="moss"]', state: 'visible' } },
  { assert: { selector: '[data-part=sw-moss][aria-selected="true"]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=sw-sky]' },
  { click: true },
  { assert: { selector: '[data-part=sample][data-swatch="sky"]', state: 'visible' } },
  { wait: 1200 },
]);
