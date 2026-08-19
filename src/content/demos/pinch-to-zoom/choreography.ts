import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=canvas][data-scale="1"]', state: 'visible' } },
  // Open over the lighthouse: it stays put while everything else grows away from it.
  { moveTo: '[data-part=grip-a]' },
  { wait: 300 },
  { pinch: { scale: 2, ms: 900 } },
  { wait: 500 },
  { assert: { selector: '[data-part=canvas][data-scale="2"]', state: 'visible' } },
  { assert: { selector: '[data-part=anchor]', state: 'visible' } },
  { wait: 600 },
  // A second open at a different point: the anchor is wherever the fingers land.
  { moveTo: '[data-part=grip-b]' },
  { wait: 300 },
  { pinch: { scale: 2, ms: 900 } },
  { wait: 500 },
  { assert: { selector: '[data-part=canvas][data-scale="4"]', state: 'visible' } },
  { wait: 800 },
  // The way back is the same gesture read in the other direction; the clamp snaps home.
  { moveTo: '[data-part=grip-a]' },
  { wait: 300 },
  { pinch: { scale: 0.25, ms: 1100 } },
  { wait: 500 },
  { assert: { selector: '[data-part=canvas][data-scale="1"]', state: 'visible' } },
  { wait: 900 },
]);
