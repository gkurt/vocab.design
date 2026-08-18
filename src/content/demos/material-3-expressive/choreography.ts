import { steps } from '#src/stage/choreography.ts';

/**
 * A poster answers no pointer, so the script is a tour: the cursor crosses the shape tile
 * with its three morph frames, the tonal colour fields, and the interface fragment where
 * both are spent, while the asserts hold each reading of the register on stage. The opening
 * wait lets the mount fade finish before the first claim is judged.
 */
export default steps([
  { wait: 450 },
  { assert: { selector: '[data-part=fragment]', state: 'visible' } },
  { assert: { selector: '[data-part=tour]', state: 'visible' } },
  { wait: 550 },
  { moveTo: '[data-part=tile-shape]' },
  { wait: 850 },
  { assert: { selector: '[data-part=morph-1]', state: 'visible' } },
  { assert: { selector: '[data-part=morph-3]', state: 'visible' } },
  { assert: { selector: '[data-part=radii]', state: 'visible' } },
  { moveTo: '[data-part=tile-colour]' },
  { wait: 850 },
  { assert: { selector: '[data-part=field-primary]', state: 'visible' } },
  { assert: { selector: '[data-part=ramp]', state: 'visible' } },
  { moveTo: '[data-part=fragment-action]' },
  { wait: 850 },
  { assert: { selector: '[data-part=fragment-heading]', state: 'visible' } },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 600 },
]);
