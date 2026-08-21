import { steps } from '#src/stage/choreography.ts';

/**
 * A printed page answers no pointer and has no states to watch, so the script is waits and
 * asserts only (SPEC §8). It holds the damage on stage piece by piece: the out of register
 * masthead, the deck cut from mismatched letters, the halftone photo off the grid, and the
 * proof stamp banged down over the lot.
 */
export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=card]', state: 'visible' } },
  { assert: { selector: '[data-part=paper]', state: 'visible' } },
  { assert: { selector: '[data-part=masthead]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=cut]', state: 'visible' } },
  { assert: { selector: '[data-part=body]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=photo]', state: 'visible' } },
  { assert: { selector: '[data-part=foot]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=stamp]', state: 'visible' } },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 800 },
]);
