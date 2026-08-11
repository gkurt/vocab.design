import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=glow]', state: 'hidden' } },
  { moveTo: '[data-part=scroller]' },
  { wait: 500 },
  // More scroll than there is content: the scroller takes what it can and the rest
  // is input it has no room for.
  { scroll: { y: 460 } },
  { wait: 300 },
  { assert: { selector: '[data-part=readout][data-at=end]', state: 'visible' } },
  { assert: { selector: '[data-part=glow]', state: 'visible' } },
  // The edge answer is an answer, not a state, so it goes on its own.
  { wait: 1900 },
  { assert: { selector: '[data-part=glow]', state: 'hidden' } },
  { wait: 400 },
  { scroll: { y: -180 } },
  { wait: 400 },
  { assert: { selector: '[data-part=readout][data-at=room]', state: 'visible' } },
  { assert: { selector: '[data-part=glow]', state: 'hidden' } },
  { wait: 900 },
]);
