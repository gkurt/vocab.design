import { steps } from '#src/stage/choreography.ts';

/**
 * Nothing here responds to a pointer, and the page's furniture is the term: it is all on
 * stage at rest, so the script is waits and asserts only (SPEC §8). The rainbow heading,
 * the blue underlined links, the counter written out in full, the midi that announces
 * itself, and the browser badge.
 */
export default steps([
  { wait: 400 },
  { assert: { selector: '[data-part=page]', state: 'visible' } },
  { assert: { selector: '[data-part=heading]', state: 'visible' } },
  { assert: { selector: '[data-part=starburst]', state: 'visible' } },
  { wait: 1100 },
  { assert: { selector: '[data-part=links]', state: 'visible' } },
  { assert: { selector: '[data-part=counter]', state: 'visible' } },
  { wait: 1100 },
  { assert: { selector: '[data-part=midi]', state: 'visible' } },
  { assert: { selector: '[data-part=badge]', state: 'visible' } },
  { wait: 700 },
]);
