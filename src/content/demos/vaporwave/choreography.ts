import { steps } from '#src/stage/choreography.ts';

/**
 * A costume answers no pointer and every part of it is drawn at rest, so the script is
 * waits and asserts only (SPEC §8): the window frame the whole thing sits in, the striped
 * sun, the perspective grid, the plaster bust, the katakana, and the chrome wordmark.
 */
export default steps([
  { wait: 400 },
  { assert: { selector: '[data-part=card]', state: 'visible' } },
  { assert: { selector: '[data-part=titlebar]', state: 'visible' } },
  { assert: { selector: '[data-part=sun]', state: 'visible' } },
  { wait: 1100 },
  { assert: { selector: '[data-part=grid]', state: 'visible' } },
  { assert: { selector: '[data-part=bust]', state: 'visible' } },
  { wait: 1100 },
  { assert: { selector: '[data-part=kana]', state: 'visible' } },
  { assert: { selector: '[data-part=wordmark]', state: 'visible' } },
  { wait: 700 },
]);
