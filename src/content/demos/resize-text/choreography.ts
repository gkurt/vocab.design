import { steps } from '#src/stage/choreography.ts';

/**
 * The card at the reader's own size, then at twice it, then back. Each segment reaches its
 * own size (SPEC §8); the claim is that the tolerant card's button is still whole at 200
 * percent while the pixel-locked twin has cut its own off.
 */
export default steps([
  { assert: { selector: '[data-part=card][data-scale="100"]', state: 'visible' } },
  { assert: { selector: '[data-part=cta]', state: 'visible' } },
  { assert: { selector: '[data-part=twin][data-clipped]', state: 'hidden' } },
  { wait: 900 },
  { moveTo: '[data-part=seg-200]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=card][data-scale="200"]', state: 'visible' } },
  { assert: { selector: '[data-part=cta]', state: 'visible' } },
  { assert: { selector: '[data-part=twin][data-clipped]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=seg-100]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=card][data-scale="100"]', state: 'visible' } },
  { assert: { selector: '[data-part=twin][data-clipped]', state: 'hidden' } },
  { wait: 900 },
]);
