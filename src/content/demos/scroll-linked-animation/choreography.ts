import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 400 },
  { assert: { selector: '[data-part=figure][data-at=start]', state: 'visible' } },
  { moveTo: '[data-part=page]' },
  // A short scroll leaves the figure part way through: there is no state to land on.
  { scroll: { y: 70 } },
  { wait: 400 },
  { assert: { selector: '[data-part=figure][data-at=middle]', state: 'visible' } },
  { wait: 400 },
  { scroll: { y: 400 } },
  { wait: 500 },
  { assert: { selector: '[data-part=figure][data-at=end]', state: 'visible' } },
  { assert: { selector: '[data-part=figure][data-progress="100"]', state: 'visible' } },
  { wait: 700 },
  // Back to the top: the mapping runs the other way, so the figure rewinds exactly.
  { scroll: { y: -470 } },
  { wait: 500 },
  { assert: { selector: '[data-part=figure][data-at=start]', state: 'visible' } },
  { assert: { selector: '[data-part=figure][data-progress="0"]', state: 'visible' } },
  { wait: 500 },
]);
