import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 600 },
  { assert: { selector: '[data-part=panel]', state: 'hidden' } },
  { assert: { selector: '[data-part=dot]', state: 'hidden' } },
  { moveTo: '[data-part=show]' },
  { click: true },
  // Well past the 280ms fade: the claim is about where the opacity settles, not
  // about a frame inside the transition.
  { wait: 700 },
  { assert: { selector: '[data-part=panel]', state: 'visible' } },
  { assert: { selector: '[data-part=dot]', state: 'visible' } },
  // Nothing else moved while the panel arrived: the room was already reserved.
  { assert: { selector: '[data-part=legend]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=hide]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=panel]', state: 'hidden' } },
  { assert: { selector: '[data-part=legend]', state: 'visible' } },
  { wait: 500 },
]);
