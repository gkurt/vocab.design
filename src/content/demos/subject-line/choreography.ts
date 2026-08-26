import { steps } from '#src/stage/choreography.ts';

// A still script (SPEC §8): three widths of the same row are all on stage at once, and
// the asserts read the cut the demo measured rather than the drawing of it. At desktop
// width neither subject is truncated, which is exactly why the two look equivalent
// there; by phone width both are cut and only one of them still carries its fact.
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=front-wide][data-cut="no"]', state: 'visible' } },
  { assert: { selector: '[data-part=back-wide][data-cut="no"]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=front-mid][data-cut="yes"]', state: 'visible' } },
  { assert: { selector: '[data-part=back-mid][data-cut="yes"]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=front-narrow][data-cut="yes"]', state: 'visible' } },
  { assert: { selector: '[data-part=back-narrow][data-cut="yes"]', state: 'visible' } },
  { assert: { selector: '[data-part=note]', state: 'visible' } },
  { wait: 1200 },
]);
