import { steps } from '#src/stage/choreography.ts';

/**
 * A page of ink answers no pointer and never changes state, so the script is waits and
 * asserts only (SPEC §8). It holds the four claims the look makes on stage in the order a
 * reader meets them: the dithered illustration, the paged footer, the residue of the page
 * before, and the four greys that force the dithering in the first place.
 */
export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=screen]', state: 'visible' } },
  { assert: { selector: '[data-part=art]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=pager]', state: 'visible' } },
  { assert: { selector: '[data-part=folio]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=ghost-screen]', state: 'visible' } },
  { assert: { selector: '[data-part=ghost-residue]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=levels]', state: 'visible' } },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 900 },
]);
