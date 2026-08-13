import { steps } from '#src/stage/choreography.ts';

/**
 * Native size first, where the two banners are indistinguishable, then zoomed, where only one
 * of them is laid out again. Each segment reaches its own level rather than flipping the
 * other's, so a pass joined halfway still ends where a whole one does (SPEC §8).
 */
export default steps([
  { assert: { selector: '[data-part=scene][data-zoom="100"]', state: 'visible' } },
  { assert: { selector: '[data-part=banner-text]', state: 'visible' } },
  { assert: { selector: '[data-part=banner-image]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=seg-140]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=scene][data-zoom="140"]', state: 'visible' } },
  { assert: { selector: '[data-part=caption][data-case="140"]', state: 'visible' } },
  { assert: { selector: '[data-part=banner-text]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-100]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=scene][data-zoom="100"]', state: 'visible' } },
  { wait: 1000 },
]);
