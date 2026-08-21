import { steps } from '#src/stage/choreography.ts';

/**
 * A composition answers no pointer, and the hierarchy is the whole claim: it is there at
 * rest, so the script is waits and asserts only (SPEC §8). What it names is what the style
 * is made of: the four drawn columns, the flush left headline, the oversized numeral, the
 * copy on its own column, and the one red rule.
 */
export default steps([
  { wait: 400 },
  { assert: { selector: '[data-part=poster]', state: 'visible' } },
  { assert: { selector: '[data-part=guides]', state: 'visible' } },
  { assert: { selector: '[data-part=headline]', state: 'visible' } },
  { wait: 1100 },
  { assert: { selector: '[data-part=numeral]', state: 'visible' } },
  { assert: { selector: '[data-part=copy]', state: 'visible' } },
  { wait: 1100 },
  { assert: { selector: '[data-part=rule]', state: 'visible' } },
  { assert: { selector: '[data-part=meta]', state: 'visible' } },
  { wait: 700 },
]);
