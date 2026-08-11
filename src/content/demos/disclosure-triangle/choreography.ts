import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=twisty][aria-expanded="false"]', state: 'visible' } },
  { assert: { selector: '[data-part=branch]', state: 'hidden' } },
  { moveTo: '[data-part=twisty]' },
  { click: true },
  { wait: 460 },
  { assert: { selector: '[data-part=twisty][aria-expanded="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=child-button]', state: 'visible' } },
  { wait: 1700 },
  // Direction is the state, so the pass turns the triangle back rather than leaving
  // the next one to start from wherever it found it (SPEC §8).
  { click: true },
  { wait: 460 },
  { assert: { selector: '[data-part=branch]', state: 'hidden' } },
  { assert: { selector: '[data-part=twisty][aria-expanded="false"]', state: 'visible' } },
  { wait: 700 },
]);
