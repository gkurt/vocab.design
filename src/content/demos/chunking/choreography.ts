import { steps } from '#src/stage/choreography.ts';

/**
 * The groups, then the same characters run together, then the groups back. Each segment
 * reaches its own state rather than flipping the other's (SPEC §8), and the counts are
 * read from the values themselves.
 */
export default steps([
  { assert: { selector: '[data-part=values][data-mode=chunked]', state: 'visible' } },
  { assert: { selector: '[data-part=pieces-card][data-count="4"]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=seg-run]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=values][data-mode=run]', state: 'visible' } },
  { assert: { selector: '[data-part=pieces-card][data-count="16"]', state: 'visible' } },
  { assert: { selector: '[data-part=pieces-code][data-count="6"]', state: 'visible' } },
  { assert: { selector: '[data-part=shape][data-mode=run]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=seg-chunked]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=values][data-mode=chunked]', state: 'visible' } },
  { assert: { selector: '[data-part=pieces-phone][data-count="3"]', state: 'visible' } },
  { wait: 900 },
]);
