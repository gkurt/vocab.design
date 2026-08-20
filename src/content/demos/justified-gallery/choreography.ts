import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The gallery fades in from mount, so the first reading of the top row waits for it.
  { wait: 700 },
  { assert: { selector: '[data-part=row-1][data-fit=flush]', state: 'visible' } },
  { assert: { selector: '[data-part=guide-top]', state: 'visible' } },
  { assert: { selector: '[data-part=guide-bottom]', state: 'visible' } },
  { wait: 600 },

  // Masonry: the same seven photos in fixed-width columns, and the bottom edge goes ragged.
  { moveTo: '[data-part=seg-masonry]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=columns][data-edge=ragged]', state: 'visible' } },
  { assert: { selector: '[data-part=row-1]', state: 'hidden' } },
  { assert: { selector: '[data-part=guide-top]', state: 'hidden' } },
  { wait: 800 },

  // Back to justified, where the row shares one height and lands flush again.
  { moveTo: '[data-part=seg-justified]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=row-1][data-fit=flush]', state: 'visible' } },
  { assert: { selector: '[data-part=photo-2]', state: 'visible' } },
  { wait: 700 },
]);
