import { steps } from '#src/stage/choreography.ts';

/**
 * A cut corner answers no pointer and all three treatments are on stage from mount,
 * so the pass is waits and asserts: it holds the comparison and the anatomy figure
 * rather than walking a cursor over them (SPEC §8). The opening wait lets the kit's
 * mount fade finish before anything is judged.
 */
export default steps([
  { wait: 450 },
  { assert: { selector: '[data-part=tour]', state: 'visible' } },
  { assert: { selector: '[data-part=plate-chamfer]', state: 'visible' } },
  { wait: 1000 },
  { assert: { selector: '[data-part=plate-fillet]', state: 'visible' } },
  { assert: { selector: '[data-part=plate-square]', state: 'visible' } },
  { wait: 1000 },
  { assert: { selector: '[data-part=anatomy-figure]', state: 'visible' } },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 1200 },
]);
