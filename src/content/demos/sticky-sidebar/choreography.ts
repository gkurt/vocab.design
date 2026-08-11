import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=card]', state: 'visible' } },
  // At rest the card is in the flow, sitting where the rail put it.
  { assert: { selector: '[data-part=card][data-stuck]', state: 'hidden' } },
  { assert: { selector: '[data-part=card][data-released]', state: 'hidden' } },
  { moveTo: '[data-part=page]' },
  { scroll: { y: 160 } },
  { wait: 700 },
  // It has reached its inset and holds there while the article keeps going.
  { assert: { selector: '[data-part=card][data-stuck]', state: 'visible' } },
  { assert: { selector: '[data-part=card][data-released]', state: 'hidden' } },
  { wait: 1200 },
  { scroll: { y: 900 } },
  { wait: 800 },
  // The rail ran out and let go: this is the half a fixed panel does not have.
  { assert: { selector: '[data-part=card][data-released]', state: 'visible' } },
  { assert: { selector: '[data-part=card][data-stuck]', state: 'hidden' } },
  { wait: 1100 },
  { scroll: { y: -900 } },
  { wait: 800 },
  { assert: { selector: '[data-part=card][data-stuck]', state: 'hidden' } },
  { assert: { selector: '[data-part=card][data-released]', state: 'hidden' } },
  { wait: 700 },
]);
