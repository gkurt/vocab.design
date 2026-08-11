import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=tints]', state: 'visible' } },
  { assert: { selector: '[data-part=sample][data-tint="60"]', state: 'visible' } },
  { moveTo: '[data-part=tint-92]' },
  { click: true },
  // The palest tint still reads as the same hue, and still takes dark text.
  { assert: { selector: '[data-part=sample][data-tint="92"]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=tint-40]' },
  { click: true },
  { assert: { selector: '[data-part=sample][data-tint="40"]', state: 'visible' } },
  { wait: 1300 },
]);
