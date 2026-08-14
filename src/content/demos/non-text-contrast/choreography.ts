import { steps } from '#src/stage/choreography.ts';

/**
 * The compliant row, the same row near 1.6:1, and back. Each segment reaches its own state
 * rather than flipping the other's (SPEC §8), and every claim is made on the measured
 * value the label carries.
 */
export default steps([
  { assert: { selector: '[data-part=row][data-mode=pass]', state: 'visible' } },
  { assert: { selector: '[data-part=ratio-border][data-value="3.1"]', state: 'visible' } },
  { assert: { selector: '[data-part=ratio-ring][data-value="5.2"]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=seg-faded]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=row][data-mode=faded]', state: 'visible' } },
  { assert: { selector: '[data-part=ratio-border][data-value="1.6"]', state: 'visible' } },
  { assert: { selector: '[data-part=ratio-ring][data-value="1.8"]', state: 'visible' } },
  { assert: { selector: '[data-part=item-chart][data-mode=faded]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=seg-pass]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=row][data-mode=pass]', state: 'visible' } },
  { assert: { selector: '[data-part=ratio-chart][data-value="4.6"]', state: 'visible' } },
  { wait: 900 },
]);
