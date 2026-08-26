import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=flame]', state: 'visible' } },
  // The plateau three levels down, and the tower that runs three levels deeper for a
  // fifth of its width: both on stage at once, which is what the picture is for.
  { assert: { selector: '[data-part=frame-raster]', state: 'visible' } },
  { assert: { selector: '[data-part=frame-utf8]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-frame=all]', state: 'visible' } },
  { wait: 400 },
  { moveTo: '[data-part=frame-raster]' },
  { wait: 500 },
  // Pointing at the widest block prices it: 36% of the profile in one frame.
  { assert: { selector: '[data-part=frame-raster][data-active]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-frame=raster]', state: 'visible' } },
  { wait: 1000 },
  { moveTo: '[data-part=frame-utf8]' },
  { wait: 500 },
  // The deepest frame in the picture, and it is worth 8%: depth is not cost.
  { assert: { selector: '[data-part=frame-utf8][data-active]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-frame=utf8]', state: 'visible' } },
  { assert: { selector: '[data-part=flame]', state: 'visible' } },
  { wait: 1300 },
]);
