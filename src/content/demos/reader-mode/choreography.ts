import { steps } from '#src/stage/choreography.ts';

/**
 * The page as shipped, then the page as the browser rebuilds it, then back. The wait before
 * the reveal is followed by a `visible` assert, which is how a summon knows that beat is
 * load-bearing and polls it rather than skipping it (SPEC §6, §8). Each segment reaches its
 * own view rather than toggling.
 */
export default steps([
  { wait: 400 },
  { assert: { selector: '[data-part=cluttered]', state: 'visible' } },
  { assert: { selector: '[data-part=reader]', state: 'hidden' } },
  { assert: { selector: '[data-part=verdict][data-view=page]', state: 'visible' } },
  { wait: 900 },

  { moveTo: '[data-part=seg-reader]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=reader]', state: 'visible' } },
  { assert: { selector: '[data-part=cluttered]', state: 'hidden' } },
  { assert: { selector: '[data-part=view][data-value=reader]', state: 'visible' } },
  { assert: { selector: '[data-part=verdict][data-view=reader]', state: 'visible' } },
  { wait: 1400 },

  { moveTo: '[data-part=seg-page]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=cluttered]', state: 'visible' } },
  { assert: { selector: '[data-part=reader]', state: 'hidden' } },
  { assert: { selector: '[data-part=verdict][data-view=page]', state: 'visible' } },
  { wait: 900 },
]);
