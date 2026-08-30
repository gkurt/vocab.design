import { steps } from '#src/stage/choreography.ts';

/**
 * The specimen rests under Classic Invert, since that is the state where the term is doing the
 * damage the term is known for. The script turns the filter off for a reference, tries the smart
 * variant, and comes back. Each segment reaches an absolute mode rather than toggling one
 * (SPEC §8), and every claim is made after the filter has finished crossing.
 */
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=screen][data-mode=classic]', state: 'visible' } },
  { assert: { selector: '[data-part=photo][data-invert=classic]', state: 'visible' } },
  { wait: 900 },

  { moveTo: '[data-part=seg-off]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=screen][data-mode=off]', state: 'visible' } },
  { assert: { selector: '[data-part=verdict][data-mode=off]', state: 'visible' } },
  { wait: 1600 },

  { moveTo: '[data-part=seg-smart]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=screen][data-mode=smart]', state: 'visible' } },
  { assert: { selector: '[data-part=photo][data-invert=smart]', state: 'visible' } },
  { assert: { selector: '[data-part=verdict][data-mode=smart]', state: 'visible' } },
  { wait: 1700 },

  { moveTo: '[data-part=seg-classic]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=screen][data-mode=classic]', state: 'visible' } },
  { assert: { selector: '[data-part=verdict][data-mode=classic]', state: 'visible' } },
  { wait: 1000 },
]);
