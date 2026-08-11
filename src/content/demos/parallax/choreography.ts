import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 600 },
  { assert: { selector: '[data-part=scene]', state: 'visible' } },
  // At rest every layer is where it was authored: there is no parallax without input.
  { assert: { selector: '[data-part=scene][data-parted]', state: 'hidden' } },
  { moveTo: '[data-part=scene]' },
  { scroll: { y: 62 } },
  { wait: 500 },
  // The sheet has travelled the whole 62px and the band a fifth of it, so the two
  // are measurably further apart than they started.
  { assert: { selector: '[data-part=scene][data-parted]', state: 'visible' } },
  { scroll: { y: 56 } },
  { wait: 500 },
  { assert: { selector: '[data-part=layer-front]', state: 'visible' } },
  { assert: { selector: '[data-part=layer-back]', state: 'visible' } },
  { scroll: { y: -140 } },
  { wait: 700 },
  // Back at the top the depth collapses again: the effect is the scroll, not a pose.
  { assert: { selector: '[data-part=scene][data-parted]', state: 'hidden' } },
  { wait: 500 },
]);
