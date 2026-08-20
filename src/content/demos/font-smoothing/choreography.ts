import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 500 },
  { assert: { selector: '[data-part=patch][data-mode=subpixel]', state: 'visible' } },
  { assert: { selector: '[data-part=pixel-edge]', state: 'visible' } },
  { assert: { selector: '[data-part=tag-subpixel]', state: 'visible' } },
  { assert: { selector: '[data-part=tag-grayscale]', state: 'hidden' } },
  // Both real samples are on stage at rest: the weight difference is the comparison.
  { assert: { selector: '[data-part=sample-subpixel]', state: 'visible' } },
  { assert: { selector: '[data-part=sample-grayscale]', state: 'visible' } },
  // Absolute picks, never a flip: each segment names a value of the property.
  { moveTo: '[data-part=seg-grayscale]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=patch][data-mode=grayscale]', state: 'visible' } },
  { assert: { selector: '[data-part=tag-grayscale]', state: 'visible' } },
  { assert: { selector: '[data-part=tag-subpixel]', state: 'hidden' } },
  { moveTo: '[data-part=readout]' },
  { wait: 700 },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  // Ends on the subpixel path, the mode the specimen mounts with.
  { moveTo: '[data-part=seg-subpixel]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=patch][data-mode=subpixel]', state: 'visible' } },
  { assert: { selector: '[data-part=pixel-edge]', state: 'visible' } },
  { wait: 700 },
]);
