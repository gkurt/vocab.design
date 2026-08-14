import { steps } from '#src/stage/choreography.ts';

// The corner takes both axes, the edge takes one, and both are held at the stop.
// A drag reaches whatever size it is released at, so nothing here flips (SPEC §8).
export default steps([
  { assert: { selector: '[data-part=panel][data-size=set]', state: 'visible' } },
  { assert: { selector: '[data-part=stop-note]', state: 'hidden' } },
  { moveTo: '[data-part=corner]' },
  { wait: 400 },
  { drag: { to: '[data-part=mark-grow]' } },
  { wait: 400 },
  { assert: { selector: '[data-part=panel][data-size=grown]', state: 'visible' } },
  { assert: { selector: '[data-part=panel][data-axis=both]', state: 'visible' } },
  { moveTo: '[data-part=edge]' },
  { wait: 400 },
  { drag: { to: '[data-part=mark-min]' } },
  { wait: 400 },
  { assert: { selector: '[data-part=panel][data-axis=x]', state: 'visible' } },
  { assert: { selector: '[data-part=panel][data-size=min]', state: 'visible' } },
  { assert: { selector: '[data-part=stop-note]', state: 'visible' } },
  { wait: 600 },
  { moveTo: '[data-part=corner]' },
  { wait: 400 },
  { drag: { to: '[data-part=mark-grow]' } },
  { wait: 400 },
  { assert: { selector: '[data-part=panel][data-size=grown]', state: 'visible' } },
  { assert: { selector: '[data-part=stop-note]', state: 'hidden' } },
  { wait: 800 },
]);
