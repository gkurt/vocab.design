import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The panel fades in from mount, so the resting claims wait for it to land.
  { wait: 700 },
  { assert: { selector: '[data-part=well][data-photo=harbour]', state: 'visible' } },
  { assert: { selector: '[data-part=status][data-state=rest]', state: 'visible' } },
  { assert: { selector: '[data-part=tray-dunes]', state: 'visible' } },
  { assert: { selector: '[data-part=well][data-over]', state: 'hidden' } },
  { wait: 500 },

  // Dragging a picture onto the well: the ring lights on the way in, and the value on the
  // well itself is what carries the evidence once the pointer has gone.
  { moveTo: '[data-part=tray-dunes]' },
  { drag: { to: '[data-part=well]' } },
  { wait: 600 },
  { assert: { selector: '[data-part=well][data-photo=dunes]', state: 'visible' } },
  { assert: { selector: '[data-part=status][data-state=dropped]', state: 'visible' } },
  { assert: { selector: '[data-part=well][data-over]', state: 'hidden' } },
  // A drop is a copy, not a move: the source keeps its picture.
  { assert: { selector: '[data-part=tray-dunes]', state: 'visible' } },
  { wait: 1000 },

  // A second drop replaces the value again, so the well is the display and the target both
  // times rather than a one-shot upload slot.
  { moveTo: '[data-part=tray-fern]' },
  { drag: { to: '[data-part=well]' } },
  { wait: 600 },
  { assert: { selector: '[data-part=well][data-photo=fern]', state: 'visible' } },
  { assert: { selector: '[data-part=status][data-state=dropped]', state: 'visible' } },
  { assert: { selector: '[data-part=tray-fern]', state: 'visible' } },
  { wait: 800 },
]);
