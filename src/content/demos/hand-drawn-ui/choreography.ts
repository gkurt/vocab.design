import { steps } from '#src/stage/choreography.ts';

/**
 * A sketch answers no pointer, so the script is a tour: the cursor walks the sketched
 * controls and then the finished column beside them, while the asserts hold both registers
 * on stage. The opening wait lets the kit's mount fade finish before anything is judged.
 */
export default steps([
  { wait: 450 },
  { assert: { selector: '[data-part=sketch-card]', state: 'visible' } },
  { assert: { selector: '[data-part=sketch-button]', state: 'visible' } },
  { wait: 600 },
  { moveTo: '[data-part=sketch-heading]' },
  { wait: 800 },
  { moveTo: '[data-part=sketch-field]' },
  { wait: 800 },
  { assert: { selector: '[data-part=sketch-check]', state: 'visible' } },
  { moveTo: '[data-part=sketch-button]' },
  { wait: 850 },
  { moveTo: '[data-part=finished]' },
  { wait: 850 },
  { assert: { selector: '[data-part=finished]', state: 'visible' } },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 600 },
]);
