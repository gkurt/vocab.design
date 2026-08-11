import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=wheel][data-pair="265"]', state: 'visible' } },
  { moveTo: '[data-part=preset-25]' },
  { click: true },
  // One line through the centre: naming either end names the other.
  { assert: { selector: '[data-part=wheel][data-pair="25"]', state: 'visible' } },
  { assert: { selector: '[data-part=preset-25][data-selected]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=preset-145]' },
  { click: true },
  { assert: { selector: '[data-part=wheel][data-pair="145"]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=preset-265]' },
  { click: true },
  { assert: { selector: '[data-part=wheel][data-pair="265"]', state: 'visible' } },
  { wait: 1300 },
]);
