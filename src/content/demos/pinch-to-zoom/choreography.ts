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
  { wait: 800 },
  // The desktop half of the same gesture: a trackpad pinch arrives as ctrl+wheel,
  // and the zoom anchors at the wheel point exactly as it anchors between fingers.
  // Five events of -52 compound to exp(0.91), which the readout rounds to 2.5x.
  { withKey: { key: 'Control', steps: [{ wheel: { y: -260 } }] } },
  { wait: 500 },
  { assert: { selector: '[data-part=canvas][data-scale="2.5"]', state: 'visible' } },
  { wait: 700 },
  // Close it back down; the clamp snaps the last fraction home.
  { pinch: { scale: 0.4, ms: 900 } },
  { wait: 500 },
  { assert: { selector: '[data-part=canvas][data-scale="1"]', state: 'visible' } },
  { wait: 900 },
]);
