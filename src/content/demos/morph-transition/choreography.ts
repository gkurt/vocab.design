import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 400 },
  { assert: { selector: '[data-part=surface][data-open]', state: 'hidden' } },
  { assert: { selector: '[data-part=detail]', state: 'hidden' } },
  { moveTo: '[data-part=open]' },
  { click: true },
  // Judged inside the 420 ms travel: the container is on its way, not cut to the panel.
  { assert: { selector: '[data-part=surface][data-state=moving]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=surface][data-open][data-state=settled]', state: 'visible' } },
  { assert: { selector: '[data-part=detail]', state: 'visible' } },
  { assert: { selector: '[data-part=compact]', state: 'hidden' } },
  { wait: 800 },
  // The same move backwards, from a control of its own rather than a flip of the first.
  { moveTo: '[data-part=close]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=surface][data-open]', state: 'hidden' } },
  { assert: { selector: '[data-part=compact]', state: 'visible' } },
  { assert: { selector: '[data-part=detail]', state: 'hidden' } },
  { wait: 500 },
]);
