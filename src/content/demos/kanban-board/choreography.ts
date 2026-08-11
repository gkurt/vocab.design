import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=board]', state: 'visible' } },
  { assert: { selector: '[data-part=card][data-in=todo]', state: 'visible' } },
  { assert: { selector: '[data-part=col-todo][data-count="3"]', state: 'visible' } },
  { assert: { selector: '[data-part=slot-doing]', state: 'visible' } },
  { moveTo: '[data-part=card]' },
  { wait: 500 },
  // Absolute destination: the card lands in Doing whatever column the pass found it in.
  { drag: { to: '[data-part=col-doing]' } },
  { wait: 600 },
  { assert: { selector: '[data-part=card][data-in=doing]', state: 'visible' } },
  // The stage a card is in is where it sits, so the counts follow the cards.
  { assert: { selector: '[data-part=col-todo][data-count="2"]', state: 'visible' } },
  { assert: { selector: '[data-part=col-doing][data-count="2"]', state: 'visible' } },
  { assert: { selector: '[data-part=slot-doing]', state: 'hidden' } },
  // Released, so the column stops advertising that it would take anything.
  { assert: { selector: '[data-part=col-doing][data-active]', state: 'hidden' } },
  { wait: 1400 },
]);
