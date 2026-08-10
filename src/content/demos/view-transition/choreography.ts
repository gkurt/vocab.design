import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=gallery]', state: 'visible' } },
  { assert: { selector: '[data-part=hero]', state: 'hidden' } },
  { moveTo: '[data-part=card-orchard]' },
  { click: true },
  // The old snapshot is taken before the callback runs, so the swap lands a frame
  // late even when the browser is not animating between the two.
  { wait: 700 },
  { assert: { selector: '[data-part=hero]', state: 'visible' } },
  { assert: { selector: '[data-part=gallery]', state: 'hidden' } },
  { wait: 1200 },
  { moveTo: '[data-part=back]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=gallery]', state: 'visible' } },
  { wait: 1000 },
]);
