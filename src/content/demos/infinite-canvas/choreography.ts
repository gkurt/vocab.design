import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 400 },
  // Mount is the fitted view: the camera framing the bounding box of what exists.
  { assert: { selector: '[data-part=viewport][data-at=home]', state: 'visible' } },
  { assert: { selector: '[data-part=viewport][data-zoom="100"]', state: 'visible' } },
  { assert: { selector: '[data-part=badge-view]', state: 'visible' } },
  { wait: 900 },
  // Dragging moves the camera, and the dot grid goes with the shapes: that is what
  // makes the surface read as a plane rather than as a document.
  { moveTo: '[data-part=pan-start]' },
  { wait: 300 },
  { drag: { to: '[data-part=pan-end]' } },
  { wait: 700 },
  { assert: { selector: '[data-part=viewport][data-at=away]', state: 'visible' } },
  { assert: { selector: '[data-part=badge-view]', state: 'visible' } },
  { wait: 1000 },
  { moveTo: '[data-part=seg-150]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=seg-150][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=viewport][data-zoom="150"]', state: 'visible' } },
  { wait: 1100 },
  { moveTo: '[data-part=seg-50]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=viewport][data-zoom="50"]', state: 'visible' } },
  { wait: 1100 },
  // Fit is the invented home: it frames what exists, since the plane itself has no end.
  { moveTo: '[data-part=fit]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=viewport][data-at=home]', state: 'visible' } },
  { assert: { selector: '[data-part=viewport][data-zoom="100"]', state: 'visible' } },
  { assert: { selector: '[data-part=seg-100][data-selected]', state: 'visible' } },
  { wait: 900 },
]);
