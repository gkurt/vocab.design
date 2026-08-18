import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 700 },
  // Mount: a wide source fitted into a 4:3 frame, which is the letterbox case.
  { assert: { selector: '[data-part=box][data-aspect="16-9"][data-fit=contain][data-bars=letterbox]', state: 'visible' } },
  { assert: { selector: '[data-part=media]', state: 'visible' } },
  { wait: 900 },
  // The same fit with a source the frame agrees with: no leftover room, so no bars.
  { moveTo: '[data-part=seg-4-3]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=box][data-aspect="4-3"][data-bars=none]', state: 'visible' } },
  { wait: 1000 },
  // Taller than the frame: the leftover room moves to the sides.
  { moveTo: '[data-part=seg-9-16]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=box][data-aspect="9-16"][data-bars=pillarbox]', state: 'visible' } },
  { wait: 1100 },
  // Same mismatch, other answer: fill the frame and the difference is taken out of the picture.
  { moveTo: '[data-part=seg-cover]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=box][data-fit=cover][data-bars=crop]', state: 'visible' } },
  { wait: 1100 },
  { moveTo: '[data-part=seg-contain]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=box][data-fit=contain][data-bars=pillarbox]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=seg-16-9]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=box][data-aspect="16-9"][data-bars=letterbox]', state: 'visible' } },
  { wait: 800 },
]);
