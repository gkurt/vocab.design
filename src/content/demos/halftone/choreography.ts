import { steps } from '#src/stage/choreography.ts';

/**
 * A printed tone has no states, so the script is waits and asserts only (SPEC §8). It holds
 * the ramp on stage with its percentage ticks, then the picture built from the same lattice,
 * then the dotted shadow the headline drags behind it.
 */
export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=panel]', state: 'visible' } },
  { assert: { selector: '[data-part=ramp]', state: 'visible' } },
  { assert: { selector: '[data-part=ticks]', state: 'visible' } },
  { wait: 1000 },
  { assert: { selector: '[data-part=picture]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=headline]', state: 'visible' } },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 800 },
]);
