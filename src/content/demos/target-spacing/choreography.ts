import { steps } from '#src/stage/choreography.ts';

/**
 * One row of targets, measured. The pass starts from the spaced row it mounts in, packs the
 * controls back the way they shipped, lays the 24 pixel circles over them so the intersection is
 * visible, and opens the gutter again until the circles clear. The offset between centres is
 * asserted as a number at every step, so the pass proves the measurement rather than the picture
 * (SPEC §8).
 */
export default steps([
  { wait: 600 },
  { assert: { selector: '[data-part=picker][data-value=spaced]', state: 'visible' } },
  { assert: { selector: '[data-part=offset][data-px="28"]', state: 'visible' } },
  { assert: { selector: '[data-part=ring-star]', state: 'visible' } },
  { assert: { selector: '[data-part=verdict][data-state=spaced]', state: 'visible' } },
  { wait: 800 },

  { moveTo: '[data-part=seg-shipped]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=bar][data-gap="0"]', state: 'visible' } },
  { assert: { selector: '[data-part=offset][data-px="20"]', state: 'visible' } },
  { assert: { selector: '[data-part=ring-star]', state: 'hidden' } },
  { assert: { selector: '[data-part=verdict][data-state=shipped]', state: 'visible' } },
  { wait: 1100 },

  { moveTo: '[data-part=seg-tested]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=ring-star]', state: 'visible' } },
  { assert: { selector: '[data-part=ring-heart]', state: 'visible' } },
  { assert: { selector: '[data-part=offset][data-px="20"]', state: 'visible' } },
  { assert: { selector: '[data-part=verdict][data-state=tested]', state: 'visible' } },
  { wait: 1300 },

  { moveTo: '[data-part=seg-spaced]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=bar][data-gap="8"]', state: 'visible' } },
  { assert: { selector: '[data-part=offset][data-px="28"]', state: 'visible' } },
  { assert: { selector: '[data-part=verdict][data-state=spaced]', state: 'visible' } },
  { wait: 900 },
]);
