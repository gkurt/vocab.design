import { steps } from '#src/stage/choreography.ts';

/**
 * An impression in paper has no states, so the script is waits and asserts only (SPEC §8).
 * It holds the card on stage with the line pressed into it and the twin that stands off it,
 * which is the only comparison the effect makes sense against.
 */
export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=card]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=deboss]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=emboss]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 700 },
]);
