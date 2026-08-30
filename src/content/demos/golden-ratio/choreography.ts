import { steps } from '#src/stage/choreography.ts';

export default steps([
  // At rest the split is drawn: the larger part against the smaller, and the next
  // division inside the remainder.
  { assert: { selector: '[data-part=card]', state: 'visible' } },
  { assert: { selector: '[data-part=rules]', state: 'visible' } },
  { assert: { selector: '[data-part=mark-large]', state: 'visible' } },
  { assert: { selector: '[data-part=mark-small]', state: 'visible' } },
  { wait: 900 },
  // With the ruling gone the card is unchanged: the proportion was never the overlay.
  { moveTo: '[data-part=seg-plain]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=seg-plain][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=rules]', state: 'hidden' } },
  { assert: { selector: '[data-part=mark-large]', state: 'hidden' } },
  { assert: { selector: '[data-part=card]', state: 'visible' } },
  { wait: 1300 },
  // Each segment names a state of the ruling, so the way back is a state too.
  { moveTo: '[data-part=seg-ruled]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=rules]', state: 'visible' } },
  { assert: { selector: '[data-part=mark-small]', state: 'visible' } },
  { wait: 800 },
]);
