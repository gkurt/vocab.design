import { steps } from '#src/stage/choreography.ts';

/**
 * A timestamp moves the player, then a word is looked for in a document that can be
 * looked in at all. Nothing is filtered away, so the passages that did not match are
 * asserted still present (SPEC §5).
 */
export default steps([
  { assert: { selector: '[data-part=panel]', state: 'visible' } },
  { assert: { selector: '[data-part=entry-3]', state: 'visible' } },
  { moveTo: '[data-part=time-3]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=entry-3][data-current]', state: 'visible' } },
  { assert: { selector: '[data-part=clock][data-at="0:18"]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=search]' },
  { type: 'kettle' },
  { wait: 600 },
  { assert: { selector: '[data-part=hits][data-count="2"]', state: 'visible' } },
  { assert: { selector: '[data-part=entry-2][data-hit]', state: 'visible' } },
  { assert: { selector: '[data-part=entry-3][data-hit]', state: 'visible' } },
  { assert: { selector: '[data-part=entry-1][data-hit]', state: 'hidden' } },
  { assert: { selector: '[data-part=entry-1]', state: 'visible' } },
  { wait: 1200 },
]);
