import { steps } from '#src/stage/choreography.ts';

/**
 * The same navigation twice: once announced, once silent. Each segment reaches an absolute state
 * and returns the router to its first page (SPEC §8), and the silent pass is proved by the title
 * going stale rather than by anything appearing, since nothing does.
 */
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=nav-wallet][data-current]', state: 'visible' } },
  { assert: { selector: '[data-part=post]', state: 'hidden' } },
  { assert: { selector: '[data-part=title][data-page=wallet]', state: 'visible' } },
  { wait: 400 },

  { moveTo: '[data-part=nav-statements]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=url][data-page=statements]', state: 'visible' } },
  { assert: { selector: '[data-part=title][data-page=statements]', state: 'visible' } },
  { assert: { selector: '[data-part=focus][data-moved=yes]', state: 'visible' } },
  { assert: { selector: '[data-part=post]', state: 'visible' } },
  { assert: { selector: '[data-part=heading-statements][data-sim-focus]', state: 'visible' } },
  { wait: 1600 },

  { moveTo: '[data-part=seg-silent]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=post]', state: 'hidden' } },
  { assert: { selector: '[data-part=nav-wallet][data-current]', state: 'visible' } },
  { assert: { selector: '[data-part=caption][data-mode=silent]', state: 'visible' } },
  { wait: 400 },

  { moveTo: '[data-part=nav-statements]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=url][data-page=statements]', state: 'visible' } },
  { assert: { selector: '[data-part=title][data-stale]', state: 'visible' } },
  { assert: { selector: '[data-part=focus][data-moved=no]', state: 'visible' } },
  { assert: { selector: '[data-part=post]', state: 'hidden' } },
  { assert: { selector: '[data-part=heading-statements][data-sim-focus]', state: 'hidden' } },
  { wait: 1600 },

  { moveTo: '[data-part=seg-announced]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=title][data-page=wallet]', state: 'visible' } },
  { assert: { selector: '[data-part=focus][data-moved=none]', state: 'visible' } },
  { assert: { selector: '[data-part=post]', state: 'hidden' } },
  { wait: 800 },
]);
