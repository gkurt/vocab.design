import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 500 },
  { assert: { selector: '[data-part=raster-hinted][data-ppem="11"]', state: 'visible' } },
  { assert: { selector: '[data-part=raster-unhinted][data-ppem="11"]', state: 'visible' } },
  // The stem outline in both panels: the same feature, rounded in one of them.
  { assert: { selector: '[data-part=outline-hinted]', state: 'visible' } },
  { assert: { selector: '[data-part=outline-unhinted]', state: 'visible' } },
  { assert: { selector: '[data-part=read-hinted]', state: 'visible' } },
  // Absolute picks, never a flip: each segment names a pixel size to rasterise at.
  { moveTo: '[data-part=seg-22]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=raster-hinted][data-ppem="22"]', state: 'visible' } },
  { assert: { selector: '[data-part=raster-unhinted][data-ppem="22"]', state: 'visible' } },
  { assert: { selector: '[data-part=outline-hinted]', state: 'visible' } },
  { moveTo: '[data-part=read-unhinted]' },
  { wait: 700 },
  { assert: { selector: '[data-part=read-unhinted]', state: 'visible' } },
  // Ends at the small size, where the rounding is the whole difference.
  { moveTo: '[data-part=seg-11]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=raster-hinted][data-ppem="11"]', state: 'visible' } },
  { assert: { selector: '[data-part=read-hinted]', state: 'visible' } },
  { wait: 700 },
]);
