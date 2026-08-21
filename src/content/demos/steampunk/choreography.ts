import { steps } from '#src/stage/choreography.ts';

/**
 * Nothing here moves and nothing answers a pointer: the panel is the style, complete at
 * rest, so the script is waits and asserts only (SPEC §8).
 */
export default steps([
  { wait: 400 },
  { assert: { selector: '[data-part=panel]', state: 'visible' } },
  { assert: { selector: '[data-part=plate]', state: 'visible' } },
  { assert: { selector: '[data-part=gauge]', state: 'visible' } },
  { assert: { selector: '[data-part=needle]', state: 'visible' } },
  { wait: 1200 },
  { assert: { selector: '[data-part=wheel]', state: 'visible' } },
  { assert: { selector: '[data-part=levers]', state: 'visible' } },
  { wait: 1200 },
  { assert: { selector: '[data-part=foot]', state: 'visible' } },
  { assert: { selector: '[data-part=valve]', state: 'visible' } },
  { wait: 700 },
]);
