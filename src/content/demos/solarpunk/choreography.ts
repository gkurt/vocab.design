import { steps } from '#src/stage/choreography.ts';

/**
 * A poster answers no pointer. The cursor walks the four things that make the genre what
 * it is: the daylight sky in its arch, the vines crossing the structure, the photovoltaic
 * cladding, and the turbine left visible behind the towers (SPEC §8).
 */
export default steps([
  { assert: { selector: '[data-part=poster]', state: 'visible' } },
  { assert: { selector: '[data-part=arch]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=sun]' },
  { wait: 800 },
  { moveTo: '[data-part=vines]' },
  { wait: 800 },
  { assert: { selector: '[data-part=towers]', state: 'visible' } },
  { moveTo: '[data-part=panels]' },
  { wait: 800 },
  { moveTo: '[data-part=turbine]' },
  { wait: 800 },
  { assert: { selector: '[data-part=panels]', state: 'visible' } },
  { assert: { selector: '[data-part=title]', state: 'visible' } },
  { wait: 600 },
]);
