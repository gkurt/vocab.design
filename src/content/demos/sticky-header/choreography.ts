import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=header]', state: 'visible' } },
  // At rest the header is in flow, below the lede: not pinned to anything yet.
  { assert: { selector: '[data-part=header][data-stuck]', state: 'hidden' } },
  { moveTo: '[data-part=page]' },
  { scroll: { y: 200 } },
  { wait: 600 },
  // It has reached the top edge and stopped there while the rows keep going.
  { assert: { selector: '[data-part=header][data-stuck]', state: 'visible' } },
  { assert: { selector: '[data-part=header]', state: 'visible' } },
  { wait: 1400 },
  // A delta past the top of the scroller: the release is a position, not a flip.
  { scroll: { y: -400 } },
  { wait: 600 },
  { assert: { selector: '[data-part=header][data-stuck]', state: 'hidden' } },
  { wait: 800 },
]);
