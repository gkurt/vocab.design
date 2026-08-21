import { steps } from '#src/stage/choreography.ts';

/**
 * A poster answers no pointer and all three reflections are drawn at rest, so the script
 * is waits and asserts only (SPEC §8). The opening wait lets the kit's own mount fade
 * finish before anything is judged.
 */
export default steps([
  { wait: 450 },
  { assert: { selector: '[data-part=tour]', state: 'visible' } },
  { assert: { selector: '[data-part=hl-tight]', state: 'visible' } },
  { wait: 1000 },
  { assert: { selector: '[data-part=tile-broad]', state: 'visible' } },
  { assert: { selector: '[data-part=hl-broad]', state: 'visible' } },
  { wait: 1000 },
  { assert: { selector: '[data-part=tile-rim]', state: 'visible' } },
  { assert: { selector: '[data-part=hl-rim]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 600 },
]);
