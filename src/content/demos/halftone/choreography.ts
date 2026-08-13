import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=panel]', state: 'visible' } },
  { assert: { selector: '[data-part=picture]', state: 'visible' } },
  { assert: { selector: '[data-part=ramp]', state: 'visible' } },
  { wait: 800 },
  // A printed screen answers no pointer: the cursor reads the ramp, then the picture
  // built from the same lattice, then the dotted shadow under the headline.
  { moveTo: '[data-part=ramp]' },
  { wait: 1000 },
  { moveTo: '[data-part=picture]' },
  { wait: 900 },
  { moveTo: '[data-part=headline]' },
  { wait: 900 },
  { assert: { selector: '[data-part=headline]', state: 'visible' } },
  { assert: { selector: '[data-part=ticks]', state: 'visible' } },
  { wait: 600 },
]);
