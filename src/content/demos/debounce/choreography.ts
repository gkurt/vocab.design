import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=debounced][data-fired="0"]', state: 'visible' } },
  { assert: { selector: '[data-part=eager][data-fired="0"]', state: 'visible' } },
  { moveTo: '[data-part=query]' },
  { wait: 300 },
  { type: 'p' },
  { type: 'a' },
  { type: 'r' },
  // Mid-burst: the eager listener has answered three times and the debounced one is
  // still waiting for the typing to stop.
  { assert: { selector: '[data-part=eager][data-fired="3"]', state: 'visible' } },
  { assert: { selector: '[data-part=debounced][data-fired="0"]', state: 'visible' } },
  { type: 'i' },
  { type: 's' },
  { assert: { selector: '[data-part=eager][data-fired="5"]', state: 'visible' } },
  // Long enough after the last keystroke for the wait to run out.
  { wait: 1200 },
  { assert: { selector: '[data-part=debounced][data-fired="1"]', state: 'visible' } },
  { wait: 1400 },
]);
