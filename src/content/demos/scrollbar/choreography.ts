import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=scrollbar]', state: 'visible' } },
  { assert: { selector: '[data-part=scrollbar][data-at=start]', state: 'visible' } },
  { wait: 600 },
  // The panel is scrolled and the thumb reports it: position is the bar's first job.
  { moveTo: '[data-part=viewport]' },
  { scroll: { y: 70 } },
  { wait: 500 },
  { assert: { selector: '[data-part=scrollbar][data-at=middle]', state: 'visible' } },
  { wait: 700 },
  // Dragging the thumb sets the position, which is the bar's second job.
  { moveTo: '[data-part=thumb]' },
  { wait: 300 },
  { drag: { to: '[data-part=track-foot]' } },
  { wait: 600 },
  { assert: { selector: '[data-part=scrollbar][data-at=end]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=viewport]' },
  { scroll: { y: -400 } },
  { wait: 500 },
  { assert: { selector: '[data-part=scrollbar][data-at=start]', state: 'visible' } },
  { wait: 700 },
]);
