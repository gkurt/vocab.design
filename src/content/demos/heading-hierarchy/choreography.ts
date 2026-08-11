import { steps } from '#src/stage/choreography.ts';

/**
 * Each segment names the set of levels it asks for, so a run resumed anywhere lands on
 * an outline that matches the article beside it.
 */
export default steps([
  { assert: { selector: '[data-part=outline][data-state=nested]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=seg-skipped]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=outline][data-state=skipped]', state: 'visible' } },
  { assert: { selector: '[data-part=row][data-jump]', state: 'visible' } },
  { wait: 1800 },
  { moveTo: '[data-part=seg-nested]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=outline][data-state=nested]', state: 'visible' } },
  { assert: { selector: '[data-part=row][data-jump]', state: 'hidden' } },
  { wait: 1200 },
]);
