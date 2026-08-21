import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=column]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { wait: 800 },
  // Three stated settings, driven in order and left on the contained one: no step
  // depends on the state it finds, so a pass joined halfway still reads true. The
  // column and the readout answer no pointer, so the waits between picks are
  // reading time rather than a tour.
  { moveTo: '[data-part=seg-normal]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=column][data-break="normal"]', state: 'visible' } },
  { wait: 1100 },
  { moveTo: '[data-part=seg-break-all]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=column][data-break="break-all"]', state: 'visible' } },
  { wait: 1100 },
  { moveTo: '[data-part=seg-break-word]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=column][data-break="break-word"]', state: 'visible' } },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 800 },
]);
