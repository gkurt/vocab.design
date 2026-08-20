import { steps } from '#src/stage/choreography.ts';

/**
 * One barrier read twice. Each segment reaches an absolute framing rather than toggling one
 * (SPEC §8), and the claim is the coverage: which readers the wording reaches, and how many. The
 * pass ends back on the need framing, which is the one the subject's `data-pose` calls honest.
 */
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=statement][data-framing=need]', state: 'visible' } },
  { assert: { selector: '[data-part=count][data-count="5"]', state: 'visible' } },
  { assert: { selector: '[data-part=reader-5][data-covered]', state: 'visible' } },
  { assert: { selector: '[data-part=handle]', state: 'visible' } },
  { wait: 1200 },

  { moveTo: '[data-part=seg-category]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=statement][data-framing=category]', state: 'visible' } },
  { assert: { selector: '[data-part=count][data-count="2"]', state: 'visible' } },
  { assert: { selector: '[data-part=reader-1][data-covered]', state: 'visible' } },
  { assert: { selector: '[data-part=reader-5][data-covered]', state: 'hidden' } },
  { assert: { selector: '[data-part=caption][data-framing=category]', state: 'visible' } },
  { wait: 2200 },

  { moveTo: '[data-part=seg-need]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=statement][data-framing=need]', state: 'visible' } },
  { assert: { selector: '[data-part=count][data-count="5"]', state: 'visible' } },
  { assert: { selector: '[data-part=reader-3][data-covered]', state: 'visible' } },
  { wait: 1000 },
]);
