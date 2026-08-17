import { steps } from '#src/stage/choreography.ts';

/**
 * A cut corner answers no pointer, so the script is a tour: the cursor walks the three
 * treatments and then the anatomy figure, while the asserts hold the whole comparison on
 * stage. The opening wait lets the kit's mount fade finish before anything is judged.
 */
export default steps([
  { wait: 450 },
  { assert: { selector: '[data-part=tour]', state: 'visible' } },
  { assert: { selector: '[data-part=plate-chamfer]', state: 'visible' } },
  { wait: 600 },
  { moveTo: '[data-part=plate-chamfer]' },
  { wait: 850 },
  { moveTo: '[data-part=plate-fillet]' },
  { wait: 800 },
  { assert: { selector: '[data-part=plate-fillet]', state: 'visible' } },
  { moveTo: '[data-part=plate-square]' },
  { wait: 800 },
  { assert: { selector: '[data-part=plate-square]', state: 'visible' } },
  { moveTo: '[data-part=anatomy]' },
  { wait: 850 },
  { assert: { selector: '[data-part=anatomy-figure]', state: 'visible' } },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 600 },
]);
