import { steps } from '#src/stage/choreography.ts';

/**
 * A sketch answers no pointer and has no states, so the script is waits and asserts only
 * (SPEC §8): it holds the sketched controls on stage beside the finished column they are
 * the same screen as. The opening wait lets the kit's mount fade finish before anything is
 * judged.
 */
export default steps([
  { wait: 450 },
  { assert: { selector: '[data-part=sketch-card]', state: 'visible' } },
  { assert: { selector: '[data-part=sketch-heading]', state: 'visible' } },
  { assert: { selector: '[data-part=sketch-field]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=sketch-check]', state: 'visible' } },
  { assert: { selector: '[data-part=sketch-button]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=finished]', state: 'visible' } },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 800 },
]);
