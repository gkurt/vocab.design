import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=roomy][data-selected]', state: 'hidden' } },
  { assert: { selector: '[data-part=readout][data-hit=miss]', state: 'hidden' } },
  // The press lands well clear of the glyph and still inside the region, which is the
  // whole claim: the target is the padded box, not the drawing.
  { moveTo: '[data-part=press-in]' },
  { wait: 450 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=roomy][data-selected]', state: 'visible' } },
  { wait: 900 },
  // The same offset from the other glyph has fallen off the end of its region.
  { moveTo: '[data-part=press-out]' },
  { wait: 450 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=tight][data-selected]', state: 'hidden' } },
  { assert: { selector: '[data-part=readout][data-hit=miss]', state: 'visible' } },
  { wait: 1000 },
]);
