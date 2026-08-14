import { steps } from '#src/stage/choreography.ts';

// Both ends of the stroke are fixed points on the canvas, so the catch is the same set on
// every pass: the four tiles the rectangle touches, and not the two columns beyond it.
export default steps([
  { assert: { selector: '[data-part=lasso]', state: 'hidden' } },
  { assert: { selector: '[data-part=readout][data-count="0"]', state: 'visible' } },
  { moveTo: '[data-part=start]' },
  { wait: 450 },
  { drag: { to: '[data-part=end]' } },
  { wait: 550 },
  { assert: { selector: '[data-part=readout][data-count="4"]', state: 'visible' } },
  { assert: { selector: '[data-part=tile-1][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=tile-6][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=tile-3][data-selected]', state: 'hidden' } },
  // Half the term: the boundary is gone the moment the gesture that drew it ends.
  { assert: { selector: '[data-part=lasso]', state: 'hidden' } },
  { wait: 900 },
  // A boundary that lives only mid-gesture leaves identify nothing to ring, so the
  // specimen carries a labelled state that parks one. Both picks are absolute.
  { moveTo: '[data-part=hold-on]' },
  { wait: 350 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=lasso]', state: 'visible' } },
  { wait: 1500 },
  { moveTo: '[data-part=hold-drag]' },
  { wait: 350 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=lasso]', state: 'hidden' } },
  { wait: 1000 },
]);
