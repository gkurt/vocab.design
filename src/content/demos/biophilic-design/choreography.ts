import { steps } from '#src/stage/choreography.ts';

/**
 * A still panel answers no pointer, so the script is a tour: the cursor crosses the blob-edged
 * hero, the list beside it whose art is the same three shapes, and the two unevenly rounded
 * tiles, while the asserts hold every part of the form language on stage. The opening wait
 * lets the mount fade finish before the first claim is judged.
 */
export default steps([
  { wait: 450 },
  { assert: { selector: '[data-part=panel]', state: 'visible' } },
  { assert: { selector: '[data-part=reference]', state: 'visible' } },
  { wait: 550 },
  { moveTo: '[data-part=panel-hero]' },
  { wait: 850 },
  { assert: { selector: '[data-part=panel-hero]', state: 'visible' } },
  { assert: { selector: '[data-part=vein]', state: 'visible' } },
  { moveTo: '[data-part=ref-blob]' },
  { wait: 850 },
  { assert: { selector: '[data-part=ref-corner]', state: 'visible' } },
  { assert: { selector: '[data-part=ref-palette]', state: 'visible' } },
  { moveTo: '[data-part=tile-water]' },
  { wait: 850 },
  { assert: { selector: '[data-part=panel-tiles]', state: 'visible' } },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 600 },
]);
