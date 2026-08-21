import { steps } from '#src/stage/choreography.ts';

/**
 * A figure is a static arrangement and answers no pointer, so the script is waits and
 * asserts only (SPEC §8). What it proves is the binding the term names: a reference in the
 * running text, the picture it points at, the caption that numbers it, and the same binding
 * again around a code listing.
 */
export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=xref]', state: 'visible' } },
  { assert: { selector: '[data-part=figure]', state: 'visible' } },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 1000 },
  { assert: { selector: '[data-part=figure-2]', state: 'visible' } },
  { assert: { selector: '[data-part=caption-2]', state: 'visible' } },
  { wait: 1000 },
]);
