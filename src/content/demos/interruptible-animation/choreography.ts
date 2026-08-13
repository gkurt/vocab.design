import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=live][data-at=left]', state: 'visible' } },
  { moveTo: '[data-part=to-right]' },
  { click: true },
  // Judged inside the 1500 ms move: both sheets are on their way to the right edge.
  { assert: { selector: '[data-part=live][data-at=right]', state: 'visible' } },
  // The second press lands about a second in, while that move is still running.
  { moveTo: '[data-part=to-left]' },
  { click: true },
  { assert: { selector: '[data-part=live][data-at=left]', state: 'visible' } },
  // The locked-out twin is still finishing the first move and has stored the second.
  { assert: { selector: '[data-part=queued][data-at=right][data-pending=left]', state: 'visible' } },
  { wait: 2600 },
  // Both end up at the same edge; only one of them got there without waiting to be told twice.
  { assert: { selector: '[data-part=live][data-at=left]', state: 'visible' } },
  { assert: { selector: '[data-part=queued][data-at=left]', state: 'visible' } },
  { assert: { selector: '[data-part=queued][data-pending]', state: 'hidden' } },
  { wait: 600 },
]);
