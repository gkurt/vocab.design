import { steps } from '#src/stage/choreography.ts';

/**
 * The same screen in three moments. Each segment reaches an absolute condition rather than
 * toggling one (SPEC §8), and every claim is made well after the overlay it names has finished
 * arriving; a condition that has been left is claimed through the overlay's own absence, never
 * through an element on its way out.
 */
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=glare]', state: 'visible' } },
  { assert: { selector: '[data-part=verdict][data-mode=glare]', state: 'visible' } },
  { assert: { selector: '[data-part=reach]', state: 'hidden' } },
  { wait: 900 },

  { moveTo: '[data-part=seg-reach]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=reach]', state: 'visible' } },
  { assert: { selector: '[data-part=glare]', state: 'hidden' } },
  { assert: { selector: '[data-part=verdict][data-mode=reach]', state: 'visible' } },
  { wait: 1700 },

  { moveTo: '[data-part=seg-mute]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=silence]', state: 'visible' } },
  { assert: { selector: '[data-part=reach]', state: 'hidden' } },
  { assert: { selector: '[data-part=verdict][data-mode=mute]', state: 'visible' } },
  { wait: 1700 },

  { moveTo: '[data-part=seg-glare]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=glare]', state: 'visible' } },
  { assert: { selector: '[data-part=verdict][data-mode=glare]', state: 'visible' } },
  { wait: 1000 },
]);
