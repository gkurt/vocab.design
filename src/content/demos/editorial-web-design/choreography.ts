import { steps } from '#src/stage/choreography.ts';

/**
 * A spread is read rather than operated: nothing here answers a pointer, so the script is
 * waits and asserts only (SPEC §8). What it proves is the composition itself, held on
 * stage part by part: the display headline over its deck, the byline between its
 * hairlines, and the drop cap, pull quote and captioned figure in the columns below.
 */
export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=opener]', state: 'visible' } },
  { assert: { selector: '[data-part=eyebrow]', state: 'visible' } },
  { assert: { selector: '[data-part=headline]', state: 'visible' } },
  { assert: { selector: '[data-part=deck]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=byline]', state: 'visible' } },
  { assert: { selector: '[data-part=dropcap]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=quote]', state: 'visible' } },
  { assert: { selector: '[data-part=figure]', state: 'visible' } },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 900 },
]);
