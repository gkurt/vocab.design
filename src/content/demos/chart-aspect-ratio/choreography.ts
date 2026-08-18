import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 700 },
  // Mount: the banked frame, where the average segment lands on 45 degrees.
  { assert: { selector: '[data-part=frame][data-shape=banked][data-angle="45"]', state: 'visible' } },
  { assert: { selector: '[data-part=angle]', state: 'visible' } },
  { wait: 1000 },
  // The same twelve numbers in a wide, short frame: the slopes flatten out.
  { moveTo: '[data-part=seg-wide]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=frame][data-shape=wide][data-angle="24"]', state: 'visible' } },
  { wait: 1300 },
  // And in a tall, narrow one, where the same series reads as a run of spikes.
  { moveTo: '[data-part=seg-tall]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=frame][data-shape=tall][data-angle="68"]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { wait: 1300 },
  // Back to the banked shape.
  { moveTo: '[data-part=seg-banked]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=frame][data-shape=banked]', state: 'visible' } },
  { wait: 800 },
]);
