import { steps } from '#src/stage/choreography.ts';

/**
 * A drawing answers no pointer and an illustration has no states, so the script is waits
 * and asserts only (SPEC §8). It holds the lit face beside the shaded one and the snow cap
 * over both, then the flat shaded gem beside its interpolated twin, which is where the
 * mechanism is stated rather than asserted.
 */
export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=scene]', state: 'visible' } },
  { assert: { selector: '[data-part=facet-lit]', state: 'visible' } },
  { assert: { selector: '[data-part=facet-shade]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=facet-cap]', state: 'visible' } },
  { assert: { selector: '[data-part=facet-far]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=gem-faceted]', state: 'visible' } },
  { assert: { selector: '[data-part=gem-smooth]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 700 },
]);
