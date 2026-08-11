import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=card]', state: 'visible' } },
  { assert: { selector: '[data-part=twin]', state: 'visible' } },
  { moveTo: '[data-part=dismiss]' },
  { click: true },
  // The deferral itself: the twin is already out of the layout while the card is
  // still on stage playing its way off it. The exit lasts 700ms and this lands
  // around a third of the way in, so the claim has room on both sides.
  { assert: { selector: '[data-part=twin]', state: 'hidden' } },
  { assert: { selector: '[data-part=slot][data-state=leaving]', state: 'visible' } },
  // Well past the end of the motion, where the removal it was holding up happens.
  { wait: 1000 },
  { assert: { selector: '[data-part=slot][data-state=gone]', state: 'visible' } },
  { assert: { selector: '[data-part=card]', state: 'hidden' } },
  { moveTo: '[data-part=restore]' },
  { click: true },
  { assert: { selector: '[data-part=card]', state: 'visible' } },
  { wait: 700 },
]);
