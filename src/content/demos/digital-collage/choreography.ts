import { steps } from '#src/stage/choreography.ts';

/**
 * A pasted-up page answers no pointer, so the script is a tour: the cursor crosses the two
 * photo fragments and the halftone piece cut from print, then the ingredient strip that
 * names what each of them is, while the asserts hold every part of the assembly on stage.
 * The opening wait lets the mount fade finish before the first claim is judged.
 */
export default steps([
  { wait: 450 },
  { assert: { selector: '[data-part=composition]', state: 'visible' } },
  { assert: { selector: '[data-part=frag-photo]', state: 'visible' } },
  { wait: 550 },
  { moveTo: '[data-part=frag-dots]' },
  { wait: 850 },
  { assert: { selector: '[data-part=frag-dots]', state: 'visible' } },
  { assert: { selector: '[data-part=tab]', state: 'visible' } },
  { moveTo: '[data-part=frag-strip]' },
  { wait: 850 },
  { assert: { selector: '[data-part=frag-strip]', state: 'visible' } },
  { assert: { selector: '[data-part=headline]', state: 'visible' } },
  { moveTo: '[data-part=ing-dots]' },
  { wait: 850 },
  { assert: { selector: '[data-part=ing-torn]', state: 'visible' } },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 600 },
]);
