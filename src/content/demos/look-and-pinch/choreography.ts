import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to arrive.
  { wait: 500 },
  { assert: { selector: '[data-part=tile-play][data-gazed]', state: 'visible' } },
  { assert: { selector: '[data-part=panel][data-committed=none]', state: 'visible' } },
  // The eyes move, the highlight follows, and nothing at all happens as a result of looking.
  { moveTo: '[data-part=tile-share]' },
  { wait: 700 },
  { assert: { selector: '[data-part=tile-share][data-gazed]', state: 'visible' } },
  { assert: { selector: '[data-part=tile-play][data-gazed]', state: 'hidden' } },
  { assert: { selector: '[data-part=panel][data-committed=none]', state: 'visible' } },
  { wait: 800 },
  // The pinch, which is the only thing in this interface that commits anything.
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=panel][data-committed=share]', state: 'visible' } },
  { wait: 900 },
  // Looking away afterwards moves the highlight and leaves the commit exactly where it was.
  { moveTo: '[data-part=tile-details]' },
  { wait: 700 },
  { assert: { selector: '[data-part=tile-details][data-gazed]', state: 'visible' } },
  { assert: { selector: '[data-part=panel][data-committed=share]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=tile-play]' },
  { wait: 700 },
  { assert: { selector: '[data-part=tile-play][data-gazed]', state: 'visible' } },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=panel][data-committed=play]', state: 'visible' } },
  { wait: 1200 },
]);
