import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=list][data-moved=no]', state: 'visible' } },
  { assert: { selector: '[data-part=list][data-ran]', state: 'hidden' } },
  // A row from above the band, carried down into it and held there. Both ends of the
  // stroke are fixed points, so the gesture is the same length on every pass.
  { moveTo: '[data-part=row-3]' },
  { wait: 600 },
  { drag: { to: '[data-part=drop-dot]' } },
  { assert: { selector: '[data-part=list][data-ran]', state: 'visible' } },
  { assert: { selector: '[data-part=list][data-moved=yes]', state: 'visible' } },
  // The drop landed on a row the reader could not see when the press landed.
  { assert: { selector: '[data-part=readout][data-drop=far]', state: 'visible' } },
  { assert: { selector: '[data-part=list][data-autoscroll=idle]', state: 'visible' } },
  { wait: 1600 },
]);
