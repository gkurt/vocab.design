import { steps } from '#src/stage/choreography.ts';

/**
 * A poster answers no pointer, so the script is a tour: the cursor visits each finish in
 * turn while the asserts hold all three reflections on stage. The opening wait lets the
 * kit's own mount fade finish before anything is judged (SPEC §8).
 */
export default steps([
  { wait: 450 },
  { assert: { selector: '[data-part=tour]', state: 'visible' } },
  { assert: { selector: '[data-part=hl-tight]', state: 'visible' } },
  { wait: 600 },
  { moveTo: '[data-part=tile-tight]' },
  { wait: 850 },
  { moveTo: '[data-part=tile-broad]' },
  { wait: 850 },
  { assert: { selector: '[data-part=hl-broad]', state: 'visible' } },
  { moveTo: '[data-part=tile-rim]' },
  { wait: 850 },
  { assert: { selector: '[data-part=hl-rim]', state: 'visible' } },
  { moveTo: '[data-part=heading]' },
  { wait: 700 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 600 },
]);
