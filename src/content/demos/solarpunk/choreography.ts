import { steps } from '#src/stage/choreography.ts';

/**
 * A poster answers no pointer and the whole genre is on stage at rest, so the script is
 * waits and asserts only (SPEC §8). What it names is what makes the genre what it is: the
 * daylight sky in its arch, the vines crossing the structure, the photovoltaic cladding,
 * and the turbine left visible behind the towers.
 */
export default steps([
  { wait: 450 },
  { assert: { selector: '[data-part=poster]', state: 'visible' } },
  { assert: { selector: '[data-part=arch]', state: 'visible' } },
  { assert: { selector: '[data-part=sun]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=towers]', state: 'visible' } },
  { assert: { selector: '[data-part=vines]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=panels]', state: 'visible' } },
  { assert: { selector: '[data-part=turbine]', state: 'visible' } },
  { assert: { selector: '[data-part=title]', state: 'visible' } },
  { wait: 800 },
]);
