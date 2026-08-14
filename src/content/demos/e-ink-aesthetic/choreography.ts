import { steps } from '#src/stage/choreography.ts';

/**
 * A page of ink answers no pointer. The cursor walks the four claims the look makes: the
 * dithered illustration, the paged footer, the residue of the page before, and the four
 * greys that force the dithering in the first place (SPEC §8).
 */
export default steps([
  { assert: { selector: '[data-part=screen]', state: 'visible' } },
  { assert: { selector: '[data-part=art]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=art]' },
  { wait: 800 },
  { moveTo: '[data-part=pager]' },
  { wait: 700 },
  { assert: { selector: '[data-part=folio]', state: 'visible' } },
  { moveTo: '[data-part=ghost-residue]' },
  { wait: 800 },
  { assert: { selector: '[data-part=ghost-screen]', state: 'visible' } },
  { moveTo: '[data-part=levels]' },
  { wait: 800 },
  { assert: { selector: '[data-part=levels]', state: 'visible' } },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 600 },
]);
