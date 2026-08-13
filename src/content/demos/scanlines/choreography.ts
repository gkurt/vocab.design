import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=screen]', state: 'visible' } },
  { assert: { selector: '[data-part=raster]', state: 'visible' } },
  { wait: 900 },
  // Take the overlay away, so what it was doing to the picture underneath is readable.
  { moveTo: '[data-part=seg-off]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=raster]', state: 'hidden' } },
  { assert: { selector: '[data-part=bars]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=seg-on]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=raster]', state: 'visible' } },
  { wait: 700 },
]);
