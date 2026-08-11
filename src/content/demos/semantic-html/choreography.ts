import { steps } from '#src/stage/choreography.ts';

/**
 * Each segment names the card it inspects, so a resumed run always has the panel and
 * the selected card saying the same thing.
 */
export default steps([
  { assert: { selector: '[data-part=roles][data-state=semantic]', state: 'visible' } },
  { assert: { selector: '[data-part=role-chip]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=seg-soup]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=roles][data-state=soup]', state: 'visible' } },
  { assert: { selector: '[data-part=none]', state: 'visible' } },
  { assert: { selector: '[data-part=role-chip]', state: 'hidden' } },
  { wait: 1800 },
  { moveTo: '[data-part=seg-semantic]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=role-chip]', state: 'visible' } },
  { wait: 1200 },
]);
