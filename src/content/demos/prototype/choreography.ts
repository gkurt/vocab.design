import { steps } from '#src/stage/choreography.ts';

/**
 * The board rests on screen 1, a press on the field proves how little is behind it, the
 * one linked control follows its link, and Back follows the return link. Each press
 * reaches an absolute screen rather than toggling one (SPEC §8), and the pass ends where
 * it began, so the loop's remount lands on a settled scene.
 */
export default steps([
  { wait: 600 },
  { assert: { selector: '[data-part=board]', state: 'visible' } },
  { assert: { selector: '[data-part=screen-a][data-current]', state: 'visible' } },
  { assert: { selector: '[data-part=screen-b][data-current]', state: 'hidden' } },
  { assert: { selector: '[data-part=caption][data-screen=a]', state: 'visible' } },
  { wait: 500 },

  { moveTo: '[data-part=field]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=screen-a][data-current]', state: 'visible' } },
  { assert: { selector: '[data-part=screen-b][data-current]', state: 'hidden' } },
  { wait: 400 },

  { moveTo: '[data-part=link-forward]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=screen-b][data-current]', state: 'visible' } },
  { assert: { selector: '[data-part=screen-a][data-current]', state: 'hidden' } },
  { assert: { selector: '[data-part=result-3]', state: 'visible' } },
  { assert: { selector: '[data-part=caption][data-screen=b]', state: 'visible' } },
  { wait: 1600 },

  { moveTo: '[data-part=link-back]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=screen-a][data-current]', state: 'visible' } },
  { assert: { selector: '[data-part=screen-b][data-current]', state: 'hidden' } },
  { assert: { selector: '[data-part=caption][data-screen=a]', state: 'visible' } },
  { wait: 900 },
]);
