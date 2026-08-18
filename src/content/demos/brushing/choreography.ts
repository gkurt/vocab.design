import { steps } from '#src/stage/choreography.ts';

// Both ends of the drag are fixed points in the data's own units, so the brush covers the
// same range on every pass: latency 90 to 250 ms by memory 26 to 78 MB, which is nine runs.
export default steps([
  { wait: 250 },
  { assert: { selector: '[data-part=brush]', state: 'hidden' } },
  // No brush means every run, not none, so the linked counts start full.
  { assert: { selector: '[data-part=readout][data-count="28"]', state: 'visible' } },
  { assert: { selector: '[data-part=count-search][data-hits="7"]', state: 'visible' } },
  { moveTo: '[data-part=brush-start]' },
  { wait: 500 },
  { drag: { to: '[data-part=brush-end]' } },
  { wait: 650 },
  { assert: { selector: '[data-part=brush]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-count="9"]', state: 'visible' } },
  // The half that matters: the linked view answered a drag made in the other chart.
  { assert: { selector: '[data-part=count-search][data-hits="4"]', state: 'visible' } },
  { assert: { selector: '[data-part=count-media][data-hits="3"]', state: 'visible' } },
  { assert: { selector: '[data-part=count-auth][data-hits="1"]', state: 'visible' } },
  { assert: { selector: '[data-part=dot-s3][data-in]', state: 'visible' } },
  { assert: { selector: '[data-part=dot-y2][data-in]', state: 'hidden' } },
  { wait: 1400 },
  { moveTo: '[data-part=clear]' },
  { wait: 500 },
  // The other half: the range outlived the hand that drew it, pointer now somewhere else.
  { assert: { selector: '[data-part=brush]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-count="9"]', state: 'visible' } },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=brush]', state: 'hidden' } },
  { assert: { selector: '[data-part=readout][data-count="28"]', state: 'visible' } },
  { assert: { selector: '[data-part=count-search][data-hits="7"]', state: 'visible' } },
  { wait: 900 },
]);
