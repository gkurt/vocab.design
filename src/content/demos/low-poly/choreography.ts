import { steps } from '#src/stage/choreography.ts';

/**
 * A drawing answers no pointer. The cursor puts the lit face beside the shaded one, then
 * the snow cap that sits over both, then compares the flat shaded gem with the
 * interpolated twin (SPEC §8).
 */
export default steps([
  { assert: { selector: '[data-part=scene]', state: 'visible' } },
  { assert: { selector: '[data-part=facet-lit]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=facet-shade]' },
  { wait: 800 },
  { moveTo: '[data-part=facet-lit]' },
  { wait: 800 },
  { moveTo: '[data-part=facet-cap]' },
  { wait: 700 },
  { assert: { selector: '[data-part=facet-shade]', state: 'visible' } },
  { moveTo: '[data-part=gem-faceted]' },
  { wait: 800 },
  { moveTo: '[data-part=gem-smooth]' },
  { wait: 800 },
  { assert: { selector: '[data-part=gem-faceted]', state: 'visible' } },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 600 },
]);
