import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=scroller]', state: 'visible' } },
  { assert: { selector: '[data-part=dots]', state: 'visible' } },
  { assert: { selector: '[data-part=dot-0][data-current]', state: 'visible' } },
  { assert: { selector: '[data-part=scroller][data-settled]', state: 'visible' } },
  { moveTo: '[data-part=scroller]' },
  // Short of a whole card: the scroller is asked to stop between two and does not.
  { scroll: { x: 200 } },
  { wait: 900 },
  { assert: { selector: '[data-part=scroller][data-index="1"]', state: 'visible' } },
  { assert: { selector: '[data-part=dot-1][data-current]', state: 'visible' } },
  { assert: { selector: '[data-part=scroller][data-settled]', state: 'visible' } },
  { wait: 700 },
  { scroll: { x: 260 } },
  { wait: 900 },
  { assert: { selector: '[data-part=scroller][data-index="2"]', state: 'visible' } },
  { assert: { selector: '[data-part=dot-2][data-current]', state: 'visible' } },
  { assert: { selector: '[data-part=scroller][data-settled]', state: 'visible' } },
  { wait: 700 },
  // Past the end: the last card still reaches the same alignment as the others.
  { scroll: { x: 320 } },
  { wait: 900 },
  { assert: { selector: '[data-part=scroller][data-index="3"]', state: 'visible' } },
  { assert: { selector: '[data-part=dot-3][data-current]', state: 'visible' } },
  { assert: { selector: '[data-part=scroller][data-settled]', state: 'visible' } },
  { wait: 900 },
  // A delta back past the start, so the return is a position rather than an undo.
  { scroll: { x: -900 } },
  { wait: 900 },
  { assert: { selector: '[data-part=scroller][data-index="0"]', state: 'visible' } },
  { assert: { selector: '[data-part=dot-0][data-current]', state: 'visible' } },
  { assert: { selector: '[data-part=scroller][data-settled]', state: 'visible' } },
  { wait: 700 },
]);
