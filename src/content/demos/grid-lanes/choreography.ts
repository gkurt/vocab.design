import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The frame fades in from mount, so the first reading of the packing waits for it.
  { wait: 700 },
  { assert: { selector: '[data-part=lane][data-free]', state: 'visible' } },
  { assert: { selector: '[data-part=item-1][data-place=lane]', state: 'visible' } },
  { assert: { selector: '[data-part=item-6][data-place=lane]', state: 'visible' } },
  { wait: 700 },

  // The same six items forced onto equal rows, where the lanes stop being lanes.
  { moveTo: '[data-part=seg-rows]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=item-1][data-place=row]', state: 'visible' } },
  { assert: { selector: '[data-part=item-5][data-place=row]', state: 'visible' } },
  { assert: { selector: '[data-part=lane]', state: 'visible' } },
  { wait: 900 },

  // Back to lanes: the sixth item takes the lane with room, not the next row.
  { moveTo: '[data-part=seg-lanes]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=lane][data-free]', state: 'visible' } },
  { assert: { selector: '[data-part=item-6][data-place=lane][data-lane="3"]', state: 'visible' } },
  { wait: 700 },
]);
