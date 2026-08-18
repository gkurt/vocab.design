import { steps } from '#src/stage/choreography.ts';

// The move runs for 1400 ms, so the mid-flight claim below sits in the middle of that window rather
// than near either edge of it, and every posed claim is given the whole move plus its settle.
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=scene][data-move=dolly]', state: 'visible' } },
  { assert: { selector: '[data-part=plane-near]', state: 'visible' } },
  { assert: { selector: '[data-part=plane-mid]', state: 'visible' } },
  { assert: { selector: '[data-part=plane-far]', state: 'visible' } },
  { assert: { selector: '[data-part=read-far]', state: 'visible' } },
  { wait: 1300 },
  { assert: { selector: '[data-part=scene][data-move=dolly][data-held=yes][data-state=posed]', state: 'visible' } },

  // The same held front plane, reached from the other direction.
  { moveTo: '[data-part=seg-zoom]' },
  { click: true },
  { wait: 1900 },
  { assert: { selector: '[data-part=scene][data-move=zoom][data-held=yes][data-state=posed]', state: 'visible' } },

  // The comparison: one factor for every plane, so the depth never changes.
  { moveTo: '[data-part=seg-plain]' },
  { click: true },
  { wait: 1900 },
  { assert: { selector: '[data-part=scene][data-move=plain][data-held=no][data-state=posed]', state: 'visible' } },

  // Mid travel, six hundred milliseconds into a fourteen hundred millisecond move.
  { moveTo: '[data-part=replay]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=scene][data-state=moving]', state: 'visible' } },
  { wait: 1400 },
  { assert: { selector: '[data-part=scene][data-move=plain][data-state=posed]', state: 'visible' } },

  { moveTo: '[data-part=seg-dolly]' },
  { click: true },
  { wait: 1900 },
  { assert: { selector: '[data-part=scene][data-move=dolly][data-held=yes][data-state=posed]', state: 'visible' } },
  { wait: 600 },
]);
